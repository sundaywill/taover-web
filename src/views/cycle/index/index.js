/**
 * Created by sunday on 04/12/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'Cycle',
  data () {
    return {
      order: [],
      detection: [],
      showLogistics: false,
      showAttrs: false
    }
  },
  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'CycleDetail' })

    if (self.$route.hash == 'logistics')
      self.showLogistics = true
    var sn = self.$route.query.sn
    if (sn !== undefined && sn !== '') {
      self.$http.get(`cycle/index?sn=${sn}`).then(
        ({ data }) => {
          self.order = data
          self.detection = data.detection
        },
        (response) => {
          console.log(response)
          // window.router.replace('/')
        })
    } else {
      // window.router.replace('/')
    }
  },
  methods: {
    alterAttr (cycleId, attrId) {
      self.$http.post(`cycle/alterAttr`, { cycleId: cycleId, attrId: attrId }).then(
        ({ data }) => {
          console.log(data)
        },
        (response) => {
          swal({ type: "error", title: "修改发货周期失败", text: "抱歉，服务器太累了，请稍后再试" })
        })
    },
    receive () {
      var self = this
      var sn = self.$route.query.sn
      if (sn !== undefined && sn !== '') {
        self.$http.post(`order/receive?sn=${sn}`).then(
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
          },
          (response) => {
            swal({ type: "error", title: "确认收货失败", text: "抱歉，服务器太累了，请稍后再试" })
          })
      } else {
        swal({ type: "error", title: "确认收货失败", text: "抱歉，服务器太累了，请稍后再试" })
      }
    },
    cancelRefund () {
      var sn = self.$route.query.sn
      if (sn !== undefined && sn !== '') {
        self.$http.get(`order/cancelRefund?sn=${sn}`).then(
          ({ data }) => {
            swal({ type: "success", title: "取消退款成功" })
          },
          (response) => {
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
          location.href = 'tel:400-9609517'
      })
    },
    hideAttrs () {
      var self = this
      var e = e || window.event //浏览器兼容性
      var elem = e.target || e.srcElement
      while (elem) {
        //循环判断至跟节点，防止点击的是div子元素
        if (elem.className && elem.className == 'attrs-wrapper') {
          return
        }
        elem = elem.parentNode
      }
      //点击的不是div或其子元素
      self.showAttrs = false
    }
  },
  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}

