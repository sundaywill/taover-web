/**
 * Created by sunday on 05/11/2016.
 */
import loader from './../../../router/loader'
import wx from 'weixin-js-sdk'

export default {
  name: 'Tuan',

  data () {
    return {
      showShare: false,
      opening: false,
      tuan: []
    }
  },

  created () {
    var self = this
    var id = self.$route.query.id
    if (id > 0) {
      self.$http.get(`tuan/index?id=${id}`).then(
        ({data}) => {
          self.tuan = data
          self.share_img = data.img
        }, (response) => {
          window.router.replace('/')
        })
    } else {
      window.router.replace('/')
    }
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'Tuan', TuanId: id })
  },

  mounted () {
    var self = this
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      setTimeout(() => {
        self.wxReady()
      }, 1000)
    }
  },

  methods: {
    showShare () {
      this.$refs.share.$emit('show')
    },
    hideShare () {
      this.$refs.share.$emit('hide')
    },

    join () {
      var self = this
      if (self.tuan.alert != '') {
        swal({
          title: '<b style="font-size: 1.5rem">' + self.tuan.alert_title + '</b>',
          text: self.tuan.alert,
          type: 'warning',
          html: true,
          confirmButtonColor: '#f45e05',
          confirmButtonText: self.tuan.btn_ok,
          showCancelButton: true,
          cancelButtonText: '我再想想'
        }, function () {
          location.href = self.tuan.link
        })
      } else {
        location.href = self.tuan.link
      }
    },

    jumpToMembers () {
      var speed = 0, y = 0, h = document.body.scrollHeight
      var interval = setInterval(function () {
        y < h / 2 ? speed += 1 : speed -= 1
        speed = speed > 1 ? speed : 1
        window.scrollTo(0, y += speed)
        if (y >= h)
          clearInterval(interval)
      }, 10)
    },

    wxReady () {
      var self = this
      wx.ready(function () {
        var share_title = '我找到了' + self.tuan.name + '，发起一个团购为大家谋福利，快来参加'
        var share_desc = '爱美食的吃货朋友千万别错过，快来参加我的团购，可以享受优惠价格哦。'
        var share_link = process.env.CROS_DOMAIN + '/tuan?id=' + self.$route.query.id
        var share_img = self.tuan.img
        wx.onMenuShareTimeline({
          title: share_title,
          link: share_link,
          imgUrl: share_img,
          trigger: function (res) {},
          success: function () {
            self.hideShare()
          },
          cancel: function () {},
          fail: function () {},
          complete: function () {}
        })
        wx.onMenuShareAppMessage({
          title: share_title,
          desc: share_desc,
          link: share_link,
          imgUrl: share_img,
          type: '', dataUrl: '',
          trigger: function (res) {},
          success: function () {
            self.hideShare()
          },
          cancel: function () {},
          fail: function () {},
          complete: function () {}
        })
      })
    }
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot'),
    Share: loader.component('share')
  }
}
