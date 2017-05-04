/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { AUTH, LOGIN, LOGOUT } from './../../mutation-types'
const cookie = require('./../../../components/cookie/cookie')

export const mutations = {
  [AUTH](state) {
    state.token = localStorage.getItem('id_token')
    state.authenticated = !!localStorage.getItem('id_token')
    if (state.authenticated) {
      Vue.http.headers.common['APIToken'] = `${localStorage.getItem('id_token')}`
    }
  },

  [LOGIN](state, token) {
    state.authenticated = true
    localStorage.setItem('id_token', token)
    Vue.http.headers.common['APIToken'] = `${token}`
    cookie.set('APIToken', token, {
      "expires": new Date(new Date().getTime() + 1000 * 86400 * 7),
      "path": '/',
      "domain": '.taover.com'
    })
  },

  [LOGOUT](state) {
    state.authenticated = false
    localStorage.removeItem('id_token')
    localStorage.removeItem('wx_token')
    Vue.http.headers.common.APIToken = ''
    cookie.remove('APIToken', {
      "expires": -1000,
      "path": '/',
      "domain": '.taover.com'
    })
  }
}
