/**
 * Created by sunday on 08/11/2016.
 */
import Vue from 'vue'
import loader from './../../../router/loader'
import service from './../../../services/auth'

export default {
  name: 'InviteLucky',

  data () {
    return {
      timer: 60,
      sending: false,
      nick: '',
      avatar: '',
      title1: '注册有好礼哦',
      title2: '',
      user: {
        username: '',
        password: '',
        smsCode: ''
      }
    }
  },

  computed: {
    verifyPhone() {
      var self = this
      return /^0?1(3[0-9]|5[0-9]|8[0-9]|7[0-9])\d{8}$/.test(self.user.username)
    },
    verifySmsCode() {
      var self = this
      return /^0?\d{6}$/.test(self.user.smsCode)
    },
    verifyPassword() {
      var self = this
      return /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(self.user.password)
    },
    verified() {
      var self = this
      return self.verifyPhone && self.verifySmsCode && self.verifyPassword
    }
  },

  created () {
    var self = this
    self.$http.get(`customs/settings?no=TABLERlNvek26910`).then(
      ({ data }) => {
        self.title1 = data.COLUMNFebPLS47709
        self.title2 = data.COLUMNQUWwOG37302
      })
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'InviteLucky' })
  },

  mounted () {
    var self = this
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      if (self.$route.query.openid !== undefined) {
        self.user.openid = self.$route.query.openid
      } else {
        var params = '?path=' + encodeURIComponent(self.$route.fullPath)
        wxToken = localStorage.getItem('wx_token')
        if (wxToken != null)
          params += '&wxToken=' + wxToken
        window.location.replace(process.env.API_LOCATION + '/login/weixin' + params)
      }
    }
    var lucky = self.$route.query.lucky
    self.$http.get(`invite/lucky?lucky=${lucky}`).then(
      ({ data }) => {
        if (data.nick != undefined) self.nick = data.nick
        if (data.avatar != undefined) self.avatar = data.avatar
      }, (response) => {})
  },

  methods: {
    sendSmsCode () {
      var self = this
      var params = {
        phone: self.user.username
      }
      self.$http.post('sms/code', params).then(
        ({ data }) => {
          self.sending = true
          var counter = setInterval(function () {
            self.timer--;
            if (self.timer <= 0) {
              self.sending = false
              clearInterval(counter)
              self.timer = 60
            }
          }, 1000)
        },
        (response) => {
          var tip = "验证码发送失败\r\n请稍后重试"
          switch (response.data.message) {
            case '1': tip = "手机号格式不正确\r\n请检查手机号是否正确"; break;
            case '2': tip = "该手机号已经注册过了"; break;
            case '3': tip = "每个手机号每天只能发送6条验证码哦"; break;
          }
          swal({ type: "warning", title: "", text: tip })
        }
      )
    },
    login () {
      var self = this
      if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        var wxToken = localStorage.getItem('wx_token')
        if (wxToken != null) {
          Vue.http.headers.common['WXToken'] = wxToken
        }
      }
      self.$http.post('login/register', {
        user: self.user,
        query: self.$route.query
      }).then(
        ({ data }) => {
          service.login(data)
          var jump = self.$route.query.jump
          jump = jump == undefined ? '/' : jump
          if (jump.substring(0,4) == 'http') {
            location.href = jump
          } else {
            window.router.push(jump)
          }
        },
        (response) => {
          var tip = '注册失败，请稍后重试'
          switch (response.data.message) {
            case '1': tip = "手机号格式不正确\r\n请检查手机号是否正确"; break;
            case '2': tip = "该手机号已经注册过了"; break;
            case '3': tip = "验证码错误\r\n请检查您的验证码"; break;
            case '4': tip = "您的微信已经绑定过了"; break;
            default: tip = "服务器累了，请稍后重试"; break;
          }
          swal({ type: "warning", title: "", text: tip, timer: 4000 }, function () {
            window.router.replace('/')
          })
        }
      )
    }
  },

  components: {
    Layout: loader.layout('app')
  }
}
