var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://api.taover.dev/api"',
  CROS_DOMAIN: '"http://localhost:8080"'
})
