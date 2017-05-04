/**
 * Created by sunday on 06/11/2016.
 */
import loader from './../../../router/loader'

export default {
  data () {
    return {
      integrals: [10, 20, 30, 40, 80, 80, 80],
      integrals1: [10, 20, 30],
      integrals2: [40, 80, 80, 80],
      checked: 0
    }
  },

  computed: {
    current () {
      var self = this
      var i = self.checked < 1 ? 0 : (self.checked > 7 ? 6 : self.checked - 1)
      return self.integrals[i]
    },
    next () {
      var self = this
      var i = self.checked < 1 ? 1 : (self.checked > 7 ? 7 : self.checked)
      return self.integrals[i]
    }
  },

  created () {
    var self = this
    // Today CheckIn
    self.checkin()
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'CheckIn', CheckedCount: self.checked })
  },

  methods: {
    checkin () {
      var self = this
      self.$http.get(`checkin/index`).then(
        ({ data }) => {
          self.checked = data
        }, (response) => {})
    }
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
