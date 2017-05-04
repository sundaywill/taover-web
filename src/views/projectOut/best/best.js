/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/projectOut'

export default {
  computed: {
    project () { return this.$store.state.projectOut.bests }
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ProjectSellOutList', ListType: 'Best' })
  },

  methods: {
    refresh (id) {
      var self = this
      self.getList(0, 10)
      setTimeout(function () {
        self.$refs.top.onLoaded(id)
      }, 500)
    },
    onInfinite () {
      var self = this
      if (self.project.more) {
        self.getList(self.project.skip, self.project.take)
        self.$emit('$InfiniteLoading:loaded')
      } else {
        self.$emit('$InfiniteLoading:complete')
      }
    },
    getList (skip, take) {
      service.bests(skip, take)
    }
  },

  components: {
    Layout: loader.layout('app'),
    RefreshLoading: loader.component('refreshLoading'),
    InfiniteLoading: loader.component('infiniteLoading')
  }
}
