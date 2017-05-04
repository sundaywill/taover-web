/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/auth'

export default {
  created () {
    var self = this
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      var data = self.$route.query
      var jump = self.$route.query.jump
      jump = (jump == undefined) ? '/' : jump
      if (data.token != undefined) {
        service.login({ token: data.token })
        if (jump.substring(0,4) == 'http') {
          window.location.replace(jump)
        } else {
          window.router.replace(jump)
        }
      } else {
        window.router.replace(jump)
      }
    } else {
      window.router.replace('/')
    }
  },

  methods: {
    login () {
      swal({
        type: "warning",
        title: "",
        text: "登录失败，请重试\r\n",
        confirmButtonText: "我知道了",
        confirmButtonColor: "#b0afaf"
      })
    }
  },

  components: {
    VLayout: loader.layout('app')
  }
}
