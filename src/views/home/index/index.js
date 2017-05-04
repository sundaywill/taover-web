import loader from './../../../router/loader'
import service from './../../../services/home'
import userService from './../../../services/user'
import { Swipe, SwipeItem } from './../../../components/swipe'
import wx from 'weixin-js-sdk'
// import cookie from './../../../components/cookie/cookie'

export default {
  name: 'Index',

  data () {
    return {
      tabs: [
        { link: '/project/taste', img: 'http://img01.taover.com/images/shichi.png' },
        { link: '/project/new', img: 'http://img01.taover.com/images/zuixin.png' },
        { link: '/project/best', img: 'http://img01.taover.com/images/cuxiao.png' },
        { link: '/project/hot', img: 'http://img01.taover.com/images/zuier.png' }
      ],
      share_title: '【淘源大集返现来了】高品质的美食全场优惠',
      share_desc: '梅子淘源大集返现美食大狂欢，充值返现金，拼就省，买就送，还有大把优惠劵',
      share_img: 'http://img01.taover.com/Public/Slide/2016/11/10/XtPLlCZhMHIm'
    }
  },

  computed: {
    authenticated () { return this.$store.state.auth.authenticated },
    avatar () { return this.$store.state.user.avatar },
    nick () { return this.$store.state.user.nick },
    slides () { return this.$store.state.home.slides },
    banners () { return this.$store.state.home.banners },
    projects () { return this.$store.state.home.projects }
  },

  created () {
    var self = this
    // Get Home Data And User Avatar
    if (self.$store.state.home.projects.length <= 0)
      service.home()
    if (self.authenticated)
      userService.me()
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'HomePage' })
  },

  mounted () {
    var self = this
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      setTimeout(() => {
        self.wxReady()
      }, 500)
    }

    var timer = setTimeout(function () {
      var img = '<img src="' + self.avatar + '" style="width: 5rem;border-radius: 50%">',
        title = img + '<h3 style="margin-top: .5rem">亲爱的' + (self.nick == '' ? '橙子' : self.nick) + '</h3>',
        text = '<h3>大梅子已经将优惠劵已经打入您的账户啦，有空给家人买点好吃的，事业成功和家庭健康齐头并进！</h3>'
      if (document.referrer == 'http://localhost:8080/reigist') {
        swal({ html: true, title: title, text: text, timer: 200000,
          confirmButtonText: "好的", confirmButtonColor: "#ff8a00" })
      } else if (self.$route.query.double11 != undefined) {
        // var double11 = cookie.get('double11')
        var money = self.$route.query.double11,
          count = self.$route.query.count
        // if (double11 == money) {
          text = money > 0 ? count + '张' + money
          + '元优惠劵\r\n已经打入您的账户啦\r\n你还在等什么？！'
            : '优惠劵已经打入您的账户\r\n你还在等什么？！'
          swal({ html: true, title: title, text: text, timer: 2000000,
            confirmButtonText: "好的", confirmButtonColor: "#ff8a00" })
        // }
      }
      clearTimeout(timer)
    }, 1000)
    // let timer2 = setTimeout(function () {
    //   cookie.remove('double11', { "expires": -1000, "path": '/', "domain": '.taover.com' })
    //   clearTimeout(timer2)
    // }, 2000)
  },

  methods: {
    refresh (id) {
      var self = this
      service.home()
      setTimeout(function () {
        self.$refs.top.onLoaded(id)
      }, 1000)
    },

    login () {
      var self = this
      if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        var params = '?path=' + encodeURIComponent(self.$route.path)
        var wxToken = localStorage.getItem('wx_token')
        if (wxToken != null)
          params += '&wxToken=' + wxToken
        location.href = process.env.API_LOCATION + '/login/weixin' + params
      } else {
        window.router.push({
          path: '/login',
          query: {
            jump: '/'
          }
        })
      }
    },

    getSettings () {
      var self = this
      self.$http.get(`customs/settings?no=TABLEWcnlFM46427`).then(
        ({ data }) => {
          self.share_title = data.COLUMNRnjDQb65742
          self.share_desc = data.COLUMNylqPRN36069
          var oss = 'http://ty-image-01.img-cn-qingdao.aliyuncs.com/'
          self.share_img = oss + data.COLUMNmpPgtf43536
        })
    },

    wxReady () {
      var self = this
      self.getSettings()

      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: self.share_title,
          link: process.env.CROS_DOMAIN,
          imgUrl: self.share_img,
          trigger: function (res) {},
          success: function () {
            self.shareGiveIntegral('COLUMNuRcelk13606')
          },
          cancel: function () {},
          fail: function () {},
          complete: function () {}
        })
        wx.onMenuShareAppMessage({
          title: self.share_title,
          desc: self.share_desc,
          link: process.env.CROS_DOMAIN,
          imgUrl: self.share_img,
          type: '', dataUrl: '',
          trigger: function (res) {},
          success: function () {
            self.shareGiveIntegral('COLUMNMOGzcC63653')
          },
          cancel: function () {},
          fail: function () {},
          complete: function () {}
        })
      })
    },

    shareGiveIntegral (no) {
      var self = this
      self.$http.post(`customs/shareGiveIntegral`, { no: no }).then(
        ({ data }) => {
          swal({ title: '', text: '朋友因你而改变，淘源送你' + data.value + '积分', timer: 4000 })
        }, (response) => {
          switch (response.data.message) {
            case '1':
              swal({ title: '', text: '您尚未登录，登录状态下转发将有积分相送', timer: 4000 }, function () {
                if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
                  var params = '?path=' + encodeURIComponent(self.$route.fullPath)
                  var wxToken = localStorage.getItem('wx_token')
                  if (wxToken != null)
                    params += '&wxToken=' + wxToken
                  location.replace(process.env.API_LOCATION + '/login/weixin' + params)
                } else {
                  window.router.push({
                    path: '/login',
                    query: {
                      'jump': self.$route.fullPath
                    }
                  })
                }
              })
              break;
            case '2':
              swal({ title: '', text: '每天前5次转发有积分，积分没有了，但热爱却从来没变', timer: 4000 })
              break;
          }
        })
    }
  },

  components: {
  	Layout: loader.layout('app'),
    Foot: loader.component('foot'),
    RefreshLoading: loader.component('refreshLoading'),
    Swipe: Swipe,
    SwipeItem: SwipeItem
  }
}
