/**
 * Created by sunday on 08/11/2016.
 */
import loader from '../../../router/loader'
import service from './../../../services/user'
import authService from './../../../services/auth'

export default {
  name: 'UserReset',

  data () {
    return {
      timer: 60,
      password: ''
    }
  },

  computed: {
    avatar () { return this.$store.state.user.avatar },
    verified () {
      var self = this
      return /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(self.password)
    }
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ChangePassword' })
    service.me()
  },

  methods: {
    reset () {
      var self = this
      self.$http.post('user/reset', { password: self.password }).then(
        ({ data }) => {
          authService.login(data)
          var jump = self.$route.query.jump
          jump = (jump == undefined) ? 'user' : jump
          if (jump.substring(0, 4) == 'http') {
            location.replace(jump)
          } else {
            window.router.replace(jump)
          }
        },
        (response) => {
          var tip = "密码设置失败，请稍后重试"
          if (response.data.message == '1')
            tip = "密码格式不正确\r\n请检查重新输入";
          swal({ type: "warning", title: "", text: tip })
        }
      )
    }
  },

  components: {
    Layout: loader.layout('app')
  }
}
