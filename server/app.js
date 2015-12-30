import express from 'express';
import config from '../config';
import chalk from 'chalk';
import Redis from 'ioredis';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';
import r from 'rethinkdb';
import bodyParser from 'body-parser';

const app = express();
const httpServer = http.Server(app);
const client = new Redis(6379, 'data-cache');
const io = socketIO(httpServer);
const jsonParser = bodyParser.json();

/**
 * Used for /api/subscribe and /api/unsubscribe.
 */
const isValidEmail = email => {
  if (!email || typeof email !== 'string') return false;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Expects an array of alpha-numeric strings. Used for /api/subscribe and /api/unsubscribe.
 */
const areValidCategories = categories => {
  if (!categories || !Array.isArray(categories)) return false;
  const re = /^[a-zA-Z0-9- ]*$/;
  for (const cat of categories) {
    if (typeof cat !== 'string' || re.test(cat) === false) return false;
  }
  return true;
};

// Enable webpack middleware if the application is being
// run in development mode.
if (config.get('globals').__DEV__) {
  const webpack       = require('webpack');
  const webpackConfig = require('../build/webpack/development_hot');
  const compiler      = webpack(webpackConfig);

  console.log(chalk.bold.red('Running server in __DEV__ env.'));

  app.use(require('./middleware/webpack-dev')({
    compiler,
    publicPath : webpackConfig.output.publicPath
  }));

  app.use(require('./middleware/webpack-hmr')({ compiler }));
}

// During production mode, spin up a proper Express server
if (config.get('globals').__PROD__) {
  // Linter will throw error for this console.log, please ignore
  console.log(chalk.bold.yellow('Running server in __PROD__ env.'));
  // Serve the static files from the 'dist' directory
  app.use(express.static('dist'));
}

/**
 * This is hit on the news-feed page.
 * Assumes that the 'news' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.get('/api/news', (req, res) => {
  // Open a change-feed connection to RethinkDB
  // Listens for any changes on 'news' table
  r.connect({ host: 'rt-database', port: 28015})
    .then( conn => {
      return r.table('news').changes().run(conn);
    })
    .then( cursor => {
      cursor.each((err, change) => {
        io.emit('REACT', change);
      });
    });

  // Initially populate news-feed from Redis cache for faster load time
  client.keys('*', (err, keys) => {
    if (err) res.sendStatus(404);

    const pipeline = client.pipeline();

    keys.forEach( key => {
      pipeline.echo(key);
      pipeline.hgetall(key);
    });

    // pipeline pads data - this code prunes the result to
    // make it easier to work with on the frontend
    pipeline.exec( (error, result) => {
      const prunedResult = {};
      let articleKey;
      for (const article of result) {
        if (typeof article[1] === 'string') {
          articleKey = article[1];
        } else {
          prunedResult[articleKey] = article[1];
        }
      }
      res.send(prunedResult);
    });
  });
});

/**
 * Will be hit from the sub/unsub page.
 * Expects a body with {categories: ARRAY OF A/N STRINGS, email: VALID EMAIL STRING}
 * Could likely be refactored to combine with unsubscribe api.
 * Assumes that the 'subscribe' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.post('/api/subscribe', jsonParser, (req, res) => {
  if (!req.body || !isValidEmail(req.body.email) || !areValidCategories(req.body.categories)) {
    res.sendStatus(400);
  } else {
    const categories = req.body.categories;
    const email = req.body.email;
    // Manually generating an ID field here to prevent the same email from
    // subscribing twice to the same category. Trying to insert a duplicate primary key
    // in RethinkDB will produce an error that is handled by RethinkDB itself.
    // It'll be seen in the write response, but we aren't looking at that and most importantly,
    // it will NOT cause an exepction in our server code.
    const subscriptions = categories.map( cat => {
      return { id: cat + '@' + email, category: cat, email: email };
    });
    r.connect({ host: 'rt-database', port: 28015})
     .then( conn => {
       return r.table('subscriptions').insert(subscriptions).run(conn);
     })
     .then( () => {
       res.sendStatus(201);
     });
  }
});

/**
 * Will be hit from the sub/unsub page.
 * Expects a body with {categories: ARRAY OF A/N STRINGS, email: VALID EMAIL STRING}
 * An unsub-all function would send an array with all categories.
 * Could likely be refactored to combine with subscribe api.
 * Assumes that the 'subscribe' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.post('/api/unsubscribe', jsonParser, (req, res) => {
  if (!req.body || !isValidEmail(req.body.email) || !areValidCategories(req.body.categories)) {
    res.sendStatus(400);
  } else {
    const categories = req.body.categories;
    const email = req.body.email;
    r.connect({ host: 'rt-database', port: 28015})
     .then( conn => {
       return r.table('subscriptions').filter(function (sub) {
         // Use a regex to filter for entries which match the provided categories.
         return r.expr(categories).contains(sub('category')).and(sub('email').eq(email));
       }).delete().run(conn);
     })
     .then( () => {
       res.sendStatus(201);
     });
  }
});

/**
 * This is hit from any specific article page.
 * Will increment or decrement 'like' count of an article by 1.
 * Expects a body with {categories: 1 OR -1} (technically 0 would work too, but why do that?)
 * If the article does not have a like field for some reason (old version of app)
 * the count will default to 1 vote. This is because the first vote
 * will be the one that inits the field and a -1 vote can CURRENTLY only be done after a +1 vote
 * from the same user.
 * Assumes that the 'news' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.post('/api/like/:id', jsonParser, (req, res) => {
  if (!req.body || typeof req.body.vote !== 'number' ||  req.body.vote > 1 || req.body.vote < -1) {
    res.sendStatus(400);
  } else {
    r.connect({ host: 'rt-database', port: 28015})
      .then( conn => {
        return r.table('news').get(req.params.id).update({ likes: r.row('likes').add(req.body.vote).default(1) }).run(conn);
      })
     .then( () => {
       res.sendStatus(201);
     });
  }
});

/**
 * Default catch-all
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

export default httpServer;
