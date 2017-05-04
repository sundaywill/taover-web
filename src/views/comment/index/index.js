/**
 * Created by sunday on 04/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/comment'

export default {
  name: 'Comment',

  data () {
    var self = this
    return {
      id: self.$route.query.id
    }
  },

  computed: {
    authenticated () { return this.$store.state.auth.authenticated },
    comments () { return this.$store.state.comment }
  },

  created () {
    var self = this
    if (self.id > 0 && self.id != self.comments.project.id)
      self.initial()
    if (self.comments.list.length == 0)
      self.getList(0, 10)
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ProjectComment', ProjectId: self.id })
  },

  methods: {
    refresh () {
      var self = this
      self.initial()
      self.getList(0, 10)
      setTimeout(function () {
        self.$refs.top.onLoaded()
      }, 500)
    },
    onInfinite () {
      var self = this
      if (self.comments.more) {
        self.getList(self.comments.skip, self.comments.take)
        self.$emit('$InfiniteLoading:loaded')
      } else {
        self.$emit('$InfiniteLoading:complete')
      }
    },
    getList (skip, take) {
      var self = this
      service.list(self.id, skip, take)
    },
    initial () {
      var self = this
      service.project(self.id)
    },
    zan (index, id, cid) {
      var self = this
      if (self.authenticated) {
        self.$http.post('comments/zan', { id: id, cid: cid }).then(
          ({ data }) => { service.zan(data, index) }, (response) => {})
      } else {
        window.router.go({
          path: 'login',
          query: {
            jump: self.$route.fullPath
          }
        })
      }
    }
  },

  components: {
    Layout: loader.layout('app'),
    RefreshLoading: loader.component('refreshLoading'),
    InfiniteLoading: loader.component('infiniteLoading'),
    Avatar: loader.component('avatar')
  }
}

