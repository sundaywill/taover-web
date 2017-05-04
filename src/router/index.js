import Vue from 'vue'
import store from './../store'
import routes from './routes'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import wxService from './../services/wechat'

localStorage.setItem('wxJsSignUrl', window.location.href)

const cookie = require('./../components/cookie/cookie')

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition !== null) {
    // savedPosition is only available for pop state navigation.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selecotr = to.hash
    } else {
      position.x = 0
      position.y = 0
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.top)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is false or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes, // Short for routes: routes
  scrollBehavior
})

// Router Before Each Configuration
router.beforeEach((to, from, next) => {
  // Salog Track Cookies And Storages
  // 外部合作渠道
  var fpid = to.query.fpid
  if (fpid !== undefined) {
    cookie.set('FROM_PID', fpid, {
      "expires": new Date(new Date().getTime() + 1000 * 86400 * 30),
      "path": '/',
      "domain": '.taover.com'
    })
    localStorage.setItem('FROM_PID', fpid)
  }
  // 内部流量通道
  var tich = to.query.tich
  if (tich !== undefined) {
    cookie.set('TI_CHANNEL', tich, {
      "expires": new Date(new Date().getTime() + 1000 * 86400 * 30),
      "path": '/',
      "domain": '.taover.com'
    })
    localStorage.setItem('TI_CHANNEL', tich)
  }

  // Salog Track Cookies
  // 外部合作渠道
  // var fpid = to.query.fpid === undefined ? '' : to.query.tich
  // 内部流量通道
  // var tich = to.query.tich === undefined ? '' : to.query.tich
  // 设置Salog Track Cookies
  // Vue.http.post('salog/cookies', { fpid: fpid, tich: tich })

  // If It is in wechat
  var isWeiXin = /micromessenger/.test(navigator.userAgent.toLowerCase())
  var wxToken = to.query.wxToken
  var fullPath = to.fullPath
  if (isWeiXin) {
    if (wxToken != undefined)
      localStorage.setItem('wx_token', wxToken)
    // Get Wechat Js Signature
    var u = navigator.userAgent
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
      wxService.jsSign(encodeURIComponent(localStorage.getItem('wxJsSignUrl')))
    else
      wxService.jsSign(encodeURIComponent(process.env.CROS_DOMAIN + fullPath))
  }

  // Require Authenticate
  if (to.meta.auth && !store.state.auth.authenticated) {
    if (isWeiXin) {
      var params = '?path=' + encodeURIComponent(fullPath)
      wxToken = localStorage.getItem('wx_token')
      if (wxToken != null)
        params += '&wxToken=' + wxToken
      window.location.replace(process.env.API_LOCATION + '/login/weixin' + params)
    } else {
      next({
        path: '/login',
        query: {
          jump: to.fullPath
        }
      })
    }
  } else {
    // Not require authenticate
    var token = localStorage.getItem('id_token')
    cookie.set('APIToken', token, {
      "expires": new Date(new Date().getTime() + 1000 * 86400 * 7),
      "path": '/',
      "domain": '.taover.com'
    })
    next()
  }
})

export default router
