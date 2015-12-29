import express from 'express';
import config from '../config';
import chalk from 'chalk';
import Redis from 'ioredis';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';
import r from 'rethinkdb';

const app = express();
const httpServer = http.Server(app);
const client = new Redis(6379, 'data-cache');
const io = socketIO(httpServer);

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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

export default httpServer;
