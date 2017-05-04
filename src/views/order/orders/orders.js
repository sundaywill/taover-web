/**
 * Created by sunday on 11/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/orders'

export default {
  name: 'OrderOrders',

  data () {
    return {
      type: 0
    }
  },

  computed: {
    orders () { return this.$store.state.orders.lists },
    counts () { return this.$store.state.orders.counts }
  },

  created () {
    var self = this
    var t = self.$route.query.type
    t = t == undefined ? 0 : t
    if (t !== self.type)
      self.changeList(t)
    service.counts()
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'UserOrders' })
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
      if (self.orders.more)
        self.getList(self.type, self.orders.skip, self.orders.take)
      self.$emit('$InfiniteLoading:loaded')
    },

    getList (type, skip, take) {
      service.lists(type, skip, take)
    },

    changeList (type) {
      var self = this
      self.type = type
      service.change(type)
      self.getList(self.type, self.orders.skip, self.orders.take)
    },

    receive (sn, id, pid) {
      var self = this
      self.$http.post(`order/receive?sn=${sn}`).then(
        ({ data }) => {
          swal({ type: "success", title: "您已确认收货，快去投票吧", text: "" },
            function () {
              window.router.push({
                path: '/vote/vote',
                query: {
                  id: id,
                  pid: pid,
                  votego: 1
                }
              })
            })
        },
        (response) => {
          swal({ type: "error", title: "确认收货失败", text: "抱歉，服务器太累了，请稍后再试" })
        })
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
