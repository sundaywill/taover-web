/**
 * Created by sunday on 08/11/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'Order',
  data () {
    return {
      order: [],
      detection: [],
      showLogistics: false
    }
  },
  created () {
    var self = this
    if (self.$route.hash == 'logistics')
      self.showLogistics = true
    var sn = self.$route.query.sn
    if (sn !== undefined && sn !== '') {
      self.$http.get(`order/index?sn=${sn}`).then(
        ({ data }) => {
          self.order = data
          self.detection = data.detection
        }, (response) => {
          window.router.replace('/')
        })
    } else {
      window.router.replace('/')
    }
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'OrderDetail' })
  },
  methods: {
    receive () {
      var self = this
      var sn = self.$route.query.sn
      if (sn !== undefined && sn !== '') {
        self.$http.post(`order/receive`, { sn: sn }).then(
          ({ data }) => {
            swal({ type: "success", title: "您已确认收货，快去投票吧", text: "" },
              function () {
                window.router.push({
                  path: '/vote/vote',
                  query: {
                    id: self.order.id,
                    pid: self.order.pid,
                    votego: 1
                  }
                })
              })
          }, (response) => {
            swal({ type: "error", title: "确认收货失败", text: "抱歉，服务器太累了，请稍后再试" })
          })
      } else {
        swal({ type: "error", title: "确认收货失败", text: "抱歉，服务器太累了，请稍后再试" })
      }
    },
    cancelRefund () {
      var self = this
      var sn = self.$route.query.sn
      if (sn !== undefined && sn !== '') {
        self.$http.post(`order/cancelRefund`, { sn: sn }).then(
          ({ data }) => {
            swal({ type: "success", title: "取消退款成功" }, function () {
              window.router.go(-1)
            })
          }, (response) => {
            swal({ type: "error", title: "取消退款失败", text: "抱歉，服务器太累了，请稍后再试" })
          })
      } else {
        swal({ type: "error", title: "取消退款失败", text: "抱歉，服务器太累了，请稍后再试" })
      }
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
          window.location.href = 'tel:400-9609517'
      })
    }
  },
  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
