/**
 * Created by sunday on 06/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/invite'
import wx from 'weixin-js-sdk'

export default {

  data () {
    return {
      image1: 'http://ty-image-01.oss-cn-qingdao.aliyuncs.com/images/yaoqing.png',
      label1: '您推荐，我送劵！ 邀请好友注册成功,好友即可额外获得100元淘源购物劵 邀请者同时可获得100元淘源购物劵',
      button1: '邀请好友送余额'
    }
  },

  computed: {
    list () { return this.$store.state.invite.friends }
  },

  created () {
    var self = this
    // initialize
    self.$http.get(`invite/index`).then(
      ({ data }) => {
        service.invite(data)
        if (/micromessenger/.test(navigator.userAgent.toLowerCase()))
          self.wxReady(data.lucky, data.nick)
      }, (response) => {
        if (/micromessenger/.test(navigator.userAgent.toLowerCase()))
          self.wxReady()
      })
    // page settings
    self.$http.get(`customs/settings?no=TABLERXFIhA42971`).then(
      ({ data }) => {
        var oss = 'http://ty-image-01.img-cn-qingdao.aliyuncs.com/'
        self.image1 = oss + data.COLUMNFXqzwK47499
        self.label1 = data.COLUMNkOVQyD19457
        self.button1 = data.COLUMNAIcodJ51194
      }, (response) => {})
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'Invite' })
  },

  methods: {
    showShare () {
      this.$refs.share.$emit('show')
    },
    hideShare () {
      this.$refs.share.$emit('hide')
    },

    wxReady (lucky = '', nick = '') {
      let self = this
      let title = nick + '请您吃新鲜水果啦'
      let link = process.env.CROS_DOMAIN + '/wait?lucky=' + lucky
      let img = 'http://ty-image-01.oss-cn-qingdao.aliyuncs.com/images/tao.jpg'
      let desc = '梅子淘源走遍全国500个绿色产地，把新鲜，特色，健康的美食带给大家'

      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: title,
          link: link,
          imgUrl: img,
          trigger: function (res) {},
          success: function () { self.hideShare() },
          cancel: function () {},
          fail: function () {},
          complete: function () {}
        })
        wx.onMenuShareAppMessage({
          title: title,
          desc: desc,
          link: link,
          imgUrl: img,
          type: '',
          dataUrl: '',
          trigger: function (res) {},
          success: function () { self.hideShare() },
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
