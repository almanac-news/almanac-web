import webpack       from 'webpack'
import config        from '../../config'
import webpackConfig from './development'
import debug from 'debug'

webpackConfig.entry.app.push(
  `webpack-hot-middleware/client?path=/__webpack_hmr`,
  `webpack/hot/dev-server`
)

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

// We need to apply the react-transform HMR plugin to the Babel configuration,
// but _only_ when HMR is enabled. Putting this in the default development
// configuration will break other tasks such as test:unit because Webpack
// HMR is not enabled there, and these transforms require it.
webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  if (
    /babel/.test(loader.loader) &&
    !~loader.query.presets.indexOf('react-hmre')
  ) {
    debug('Apply react-transform-hmre preset.')
    loader.query.presets.push('react-hmre')
  }

  return loader
})

export default webpackConfig
