/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/goods'
import UCircle from './../../../components/circle/u-circle'
import wx from 'weixin-js-sdk'

export default {
  name: 'Goods',

  data () {
    return {
      voteCurrent: true
    }
  },

  computed: {
    project () { return this.$store.state.goods.project },
    votes () { return this.$store.state.goods.votes },
    progress () { return this.$store.state.goods.progress },
    goods () { return this.$store.state.goods.goods },
    comments () { return this.$store.state.goods.comments },
  },

  created () {
    var self = this
    // Get Goods Info
    self.initial()
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'Project', ProjectId: self.$route.query.id })
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
    initial () {
      var self = this
      var id = self.$route.query.id
      if (id > 0 && id != self.project.id) {
        service.project(id)
        service.votes(id)
        service.progress(id)
        service.goods(id)
        service.comments(id)
      }
    },
    wxReady () {
      var self = this
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: self.project.share_title,
          link: self.project.link,
          imgUrl: self.project.image,
          trigger: function (res) {},
          success: function () {
            self.shareGiveIntegral('COLUMNuRcelk13606')
          },
          cancel: function () {},
          fail: function () {},
          complete: function () {}
        })
        wx.onMenuShareAppMessage({
          title: self.project.weixin_share_title,
          desc: self.project.weixin_share_content,
          link: self.project.link,
          imgUrl: self.project.image,
          type: '',
          dataUrl: '',
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
    UCircle: UCircle
  }
}

