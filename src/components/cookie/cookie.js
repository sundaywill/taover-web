/**
 * Created by sunday on 03/11/2016.
 */
var cookie = {
  set: function(name, value, opts) {
    if (!opts) opts = {}
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (opts.expires != undefined)
      cookie += '; Expires=' + opts.expires
    if (opts.path)
      cookie += '; Path=' + opts.path
    if (opts.domain)
      cookie += '; Domain=' + opts.domain
    document.cookie = cookie
  },
  get: function(name) {
    var result = document.cookie.match(new RegExp('(?:^|; )' + encodeURIComponent(name).replace(/[.*()]/g, '\\$&') + '=([^;]*)'))
    return result ? decodeURIComponent(result[1]) : null
  },
  remove: function(name, opts) {
    if (!opts) opts = {}
    opts.maxAge = 0
    cookie.set(name, '', opts)
  }
}

// CommonJS
if (typeof module != 'undefined' && module.exports)
  module.exports = cookie
