/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import VueResource from 'vue-resource/dist/vue-resource'
Vue.use(VueResource)

// Vue Resource Configuration
Vue.http.options.root = process.env.API_LOCATION
Vue.http.headers.common['Accept'] = 'application/json'
Vue.http.headers.common['Access-Control-Allow-Origin'] = process.env.CROS_DOMAIN

// Token Authenticate Check
import authService from './../services/auth'
Vue.http.interceptors.push((request, next) => {
  request.params.FROM_PID = localStorage.getItem('FROM_PID')
  request.params.TI_CHANNEL = localStorage.getItem('TI_CHANNEL')
  next((response) => {
    // If the token is invalid
    if (response.status === 401) {
      authService.logout()
      // If view require authenticate, go to login
      var curRoute = window.router.currentRoute
      if (curRoute.meta.auth) {
        if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
          // If in wechat
          var params = '?path=' + encodeURIComponent(fullPath)
          wxToken = localStorage.getItem('wx_token')
          if (wxToken != null)
            params += '&wxToken=' + wxToken
          location.replace(process.env.API_LOCATION + '/login/weixin' + params)
        } else {
          // If not in wechat
          window.router.push({
            path: '/login',
            query: {
              jump: curRoute.fullPath
            }
          })
        }
      }
    }
  })
})

const http = Vue.http
export default http
