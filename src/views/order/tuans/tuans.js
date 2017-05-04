/**
 * Created by sunday on 23/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/tuans'

export default {
  name: 'OrderTuans',

  data () {
    return {
      type: 0
    }
  },

  computed: {
    tuans () { return this.$store.state.tuans.lists },
    counts () { return this.$store.state.tuans.counts }
  },

  created () {
    var self = this
    var t = self.$route.query.type
    t = t == undefined ? 0 : t
    if (t !== self.type)
      self.changeList(t)
    service.counts()
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'UserTuans' })
  },

  methods: {
    refresh (id) {
      var self = this
      self.getList(self.type, 0, 10)
      setTimeout(function () {
        self.$refs.top.onLoaded(id)
      }, 500)
    },

    onInfinite () {
      var self = this
      if (self.tuans.more)
        self.getList(self.type, self.tuans.skip, self.tuans.take)
      self.$emit('$InfiniteLoading:loaded')
    },

    getList (type, skip, take) {
      service.lists(type, skip, take)
    },

    changeList (type) {
      var self = this
      self.type = type
      service.change(type)
      self.getList(self.type, self.tuans.skip, self.tuans.take)
    },

    call () {
      swal({
        title: "",
        text: '梅子淘源客服电话：<a href="tel:400-9609517">400-9609517</a><br><p>（工作日 10:00 - 18:00）</p>',
        html: true,
        showCancelButton: true,
        confirmButtonColor: "#FF8A00",
        confirmButtonText: "拨打",
        cancelButtonText: "取消",
      }, function (isConfirm) {
        if (isConfirm)
          location.href = 'tel:400-9609517'
      })
    }
  },
  components: {
    Layout: loader.layout('app'),
    RefreshLoading: loader.component('refreshLoading'),
    InfiniteLoading: loader.component('infiniteLoading'),
  }
}
