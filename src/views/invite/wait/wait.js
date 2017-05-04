/**
 * Created by sunday on 06/12/2016.
 */
export default {
  name: 'InviteWait',
  created () {
    var self = this
    var lucky = self.$route.query.lucky
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      var params = '?path=' + encodeURIComponent('lucky=' + lucky)
      var wxToken = localStorage.getItem('wx_token')
      if (wxToken != null)
        params += '&wxToken=' + wxToken
      window.location.replace(process.env.API_LOCATION + '/login/weixin' + params)
    } else {
      window.router.replace({
        path: '/lucky',
        query: {
          lucky: lucky
        }
      })
    }
  }
}
