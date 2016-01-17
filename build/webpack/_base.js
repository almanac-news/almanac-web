import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../../config'
import 'babel-polyfill'

const paths = config.get('utils_paths')

const webpackConfig = {
  name    : 'client',
  target  : 'web',
  entry   : {
    app : [
      paths.base(config.get('dir_client')) + '/app.js'
    ],
    vendor : config.get('vendor_dependencies')
  },
  output : {
    filename   : '[name].[hash].js',
    path       : paths.base(config.get('dir_dist')),
    publicPath : '/'
  },
  plugins : [
    new webpack.DefinePlugin(config.get('globals')),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template : paths.client('index.html'),
      hash     : false,
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    })
  ],
  resolve : {
    extensions : ['', '.js', '.jsx'],
    alias      : config.get('utils_aliases')
  },
  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader  : 'babel',
        query: {
          cacheDirectory: true,
          presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
          plugins: [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy',
            'transform-react-display-name'
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test    : /\.scss$/,
        loaders : [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader'
        ]
      },
      /* eslint-disable */
      { test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      { test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" },
      { test: /\.png$/,          loader: 'file?name=[name].[ext]' },
      { test: /\.jpg$/,          loader: 'file?name=[name].[ext]' }
      /* eslint-enable */
    ]
  },
  sassLoader : {
    includePaths : paths.client('styles')
  },
  postcss : [
    cssnano({
      sourcemap : true,
      autoprefixer : {
        add      : true,
        remove   : true,
        browsers : ['last 2 versions']
      },
      discardComments : {
        removeAll : true
      }
    })
  ]
}

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].[hash].js'
)
commonChunkPlugin.__KARMA_IGNORE__ = true
webpackConfig.plugins.push(commonChunkPlugin)

export default webpackConfig
