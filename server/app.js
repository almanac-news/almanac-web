import express from 'express';
import historyApiFallback from 'connect-history-api-fallback';
import config from '../config';
import chalk from 'chalk';
import fetch from 'node-fetch';

const app = express();

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

app.get('/api/news', function (req, res) {
  fetch('http://app-service:5000/news')
    .then( response => response.json() )
    .then( data => res.send(data) )
    .catch( err => console.error(err) );
});

app.use(historyApiFallback({
  verbose : false
}));

export default app;
