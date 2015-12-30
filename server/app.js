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

app.get('/api/news', (req, res) => {

  r.connect({ host: 'rt-database', port: 28015})
    .then( conn => {
      return r.table('finance').changes().run(conn);
    })
    .then( cursor => {
      cursor.each((err, change) => {
        io.emit('REACT', change);
      })
    });

  client.keys('*', (err, keys) => {
    if (err) res.sendStatus(404);

    const pipeline = client.pipeline();

    keys.forEach( key => {
      pipeline.echo(key);
      pipeline.hgetall(key);
    });

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

app.post('/api/subscribe', jsonParser, (req, res) => {
  if (!req.body || !isValidEmail(req.body.email) || !areValidCategories(req.body.categories)) {
    res.sendStatus(400);
  } else {
    let categories = req.body.categories;
    let email = req.body.email;
    let subscriptions = categories.map( cat => {
      return { id: cat+'@'+email, category: cat, email: email };
    });
    r.connect({ host: 'rt-database', port: 28015})
     .then( conn => {
       return r.table('subscriptions').insert(subscriptions).run(conn);
     })
     .then( () => {
       res.sendStatus(201);
     });
   }
})

app.post('/api/unsubscribe', jsonParser, (req, res) => {
  if (!req.body || !isValidEmail(req.body.email) || !areValidCategories(req.body.categories)) {
    res.sendStatus(400);
  } else {
    let categories = req.body.categories;
    let email = req.body.email;
    r.connect({ host: 'rt-database', port: 28015})
     .then( conn => {
       return r.table('subscriptions').filter(function(sub) {
         return r.expr(categories).contains(sub('category')).and(sub('email').eq(email))
       }).delete().run(conn);
     })
     .then( () => {
       res.sendStatus(201);
     });
   }
})

app.post('/api/like/:id', jsonParser, (req, res) => {
  if (!req.body || typeof req.body.vote !== 'number' ||  req.body.vote > 1 || req.body.vote < 1) {
    res.sendStatus(400);
  } else {
    r.connect({ host: 'rt-database', port: 28015})
      .then( conn => {
        return r.table('news').get(req.params.id).update({ likes: r.row('likes').add(req.body.vote).default(0) }).run(conn);
     })
     .then( () => {
       res.sendStatus(201);
     })
  }
})


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

const isValidEmail = email => {
  if (!email || typeof email !== 'string') return false;
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const areValidCategories = categories => {
  if (!categories || !Array.isArray(categories)) return false;
  let re = /^[a-zA-Z0-9- ]*$/;
  for (const cat of categories) {
    if (typeof cat !== 'string' || re.test(cat) === false) return false;
  }
  return true;
}

export default httpServer;
