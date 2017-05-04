/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/integral'

export default {
  name: 'Integral',

  computed: {
    integral () { return this.$store.state.integral.integrals }
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'MyIntegrals' })
  },

  methods: {
    refresh (id) {
      var self = this
      service.integrals(0, 20)
      setTimeout(function () {
        self.$refs.top.onLoaded(id)
      }, 500)
    },
    onInfinite () {
      var self = this
      if (self.integral.more) {
        self.getList(self.integral.skip, self.integral.take)
        self.$emit('$InfiniteLoading:loaded')
      } else {
        self.$emit('$InfiniteLoading:complete')
      }
    },
    getList (skip, take) {
      service.integrals(skip, take)
    }
  },

  components: {
    Layout: loader.layout('app'),
    RefreshLoading: loader.component('refreshLoading'),
    InfiniteLoading: loader.component('infiniteLoading')
  }
}
