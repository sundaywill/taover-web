/**
 * Created by sunday on 08/11/2016.
 */
import loader from '../../../router/loader'

export default {
  name: 'UserNick',

  data() {
    return {
      nickname: ''
    }
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ChangeNickname' })
  },

  methods: {
    modifyNick () {
      var self = this;
      var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,8}$/;
      if(reg.test(self.nickname)) {
        self.$http.post('user/modifyNick', {nickname: self.nickname}).then(
          ({ data }) => {
            var jump = self.$route.query.jump
            jump = (jump == undefined) ? '/user' : jump
            if (jump.substring(0, 4) == 'http') {
              location.replace(jump)
            } else {
              window.router.replace(jump)
            }
          },
          (response) => {
            var tip = "昵称修改失败，请稍后重试"
            swal({ type: "warning", title: "", text: tip })
          }
        )
      } else {
        var tip = "昵称需由2~8个汉字、字母、数字、下划线组成"
        swal({ type: "warning", title: "", text: tip })
        return false;
      }
    }
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
