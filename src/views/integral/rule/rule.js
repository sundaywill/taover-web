/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'IntegralRule',

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'IntegralHelp' })
  },

  components: {
    Layout: loader.layout('app')
  }
}
