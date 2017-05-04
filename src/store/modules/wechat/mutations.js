/**
 * Created by sunday on 04/11/2016.
 */
import {
  FETCH_WECHATJSSIGN,
  CLEAR_WECHATJSSIGN
} from './../../mutation-types'
import wx from 'weixin-js-sdk'

export const mutations = {
  [FETCH_WECHATJSSIGN](state, data) {
    state.jsSign = data.sign
    state.jsSign.jsApiList = data.apiList
    state.jsSign.debug = false
    wx.config(state.jsSign)
  },

  [CLEAR_WECHATJSSIGN](state) {
    state.jsSign = []
  }
}
