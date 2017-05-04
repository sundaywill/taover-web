var utils = require('./utils.alpha')
var config = require('../config')
var isPreview = process.env.NODE_ENV === 'preview'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isPreview
      ? config.preview.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isPreview
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}
