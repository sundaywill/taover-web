/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import loader from './../../../router/loader'
import service from './../../../services/auth'

export default {
  data() {
    return {
      timer: 60,
      sending: false,
      nick: '',
      avatar: '',
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

  ready() {
    var self = this
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      if (self.$route.query.openid != undefined) {
        self.user.openid = self.$route.query.openid
      }
      if (self.$route.query.nick != undefined) {
        self.nick = self.$route.query.nick
      }
      if (self.$route.query.avatar != undefined) {
        self.avatar = self.$route.query.avatar
      }
    }
  },

  methods: {
    sendSmsCode() {
      var self = this
      var params = {
        phone: self.user.username,
        type: 1
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
            window.location.href = jump
          } else {
            window.router.replace(jump)
          }
        },
        (response) => {
          var tip = '注册失败，请稍后重试'
          switch (response.data.message) {
            case '1': tip = "手机号格式不正确\r\n请检查手机号是否正确"; break;
            case '2': tip = "该手机号已经注册过了"; break;
            case '3': tip = "验证码错误\r\n请检查您的验证码"; break;
          }
          swal({ type: "warning", title: "", text: tip })
        }
      )
    }
  },

  components: {
    Layout: loader.layout('app')
  }
}

