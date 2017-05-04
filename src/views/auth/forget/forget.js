/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/auth'

export default {
  data () {
    return {
      timer: 60,
      sending: false,
      user: {
        phone: '',
        code: ''
      }
    }
  },

  computed: {
    verifyPhone () {
      var self = this
      return /^0?1(3[0-9]|5[0-9]|8[0-9]|7[0-9])\d{8}$/.test(self.user.phone)
    },
    verified () {
      var self = this
      return self.verifyPhone && /^0?\d{6}$/.test(self.user.code)
    }
  },

  methods: {
    sendCode () {
      var self = this
      var params = {
        phone: self.user.phone,
        type: 2
      }
      self.$http.post('sms/code', params).then(
        ({ data }) => {
          console.log(data)
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
            case '2': tip = "该手机号还未注册"; break;
            case '3': tip = "每个手机号每天只能发送6条验证码哦"; break;
          }
          swal({ type: "warning", title: "", text: tip })
        }
      )
    },
    login () {
      var self = this
      self.$http.post('login/code', self.user).then(
        ({ data }) => {
          service.login(data)
          window.router.push('/user/reset')
        },
        (response) => {
          var tip = "登录失败，请稍后重试"
          switch (response.data.message) {
            case '1': tip = "手机号格式不正确\r\n请检查手机号是否正确"; break;
            case '2': tip = "您还没有注册哦\r\n请先注册"; break;
            case '3': tip = "验证码错误\r\n请重新输入"; break;
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

