/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/auth'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },

  computed: {
    verified() {
      var self = this
      return /^0?1(3[0-9]|5[0-9]|8[0-9]|7[0-9])\d{8}$/.test(self.user.username) && self.user.password != ''
    }
  },

  created () {
    var self = this
    /*if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      var params = '?path=' + encodeURIComponent(self.$route.path)
      var wxToken = localStorage.getItem('wx_token')
      if (wxToken != null) {
        params += '&wxToken=' + wxToken
      }
      location.replace(process.env.API_LOCATION + '/login/weixin' + params)
    }*/
  },

  methods: {
    login () {
      var self = this
      self.$http.post('login/index', self.user).then(
        ({ data }) => {
          service.login(data)
          var jump = self.$route.query.jump
          jump = (jump == undefined) ? '/' : jump
          if (jump.substring(0, 4) == 'http') {
            window.location.replace(jump)
          } else {
            window.router.replace(jump)
          }
        },
        (response) => {
          console.log(response.data)
          var tip = "登录失败，请稍后重试"
          switch (response.data.message) {
            case '1': tip = "手机号格式不正确\r\n请检查手机号是否正确"; break;
            case '2': tip = "您还没有注册哦\r\n请先注册"; break;
            case '3': tip = "密码不对哦\r\n请重新输入"; break;
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

