import webpack           from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config            from '../../config';
import webpackConfig     from './_base';

if (config.get('production_enable_source_maps')) {
  webpackConfig.devtool = 'source-map';
}

webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  if (/css/.test(loader.test)) {
    const [first, ...rest] = loader.loaders;

    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    delete loader.loaders;
  }

  return loader;
});

webpackConfig.plugins.push(
  new ExtractTextPlugin('[name].[hash].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress : {
      'unused'    : true,
      'dead_code' : true
    }
  })
);

export default webpackConfig;
