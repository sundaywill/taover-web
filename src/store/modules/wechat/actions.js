/**
 * Created by sunday on 04/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchWechatJsSign = (sign, apiList = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage'
]) => {
  store.commit(types.FETCH_WECHATJSSIGN, { sign: sign, apiList: apiList })
}

export const clearWechatJsSign = () => {
  store.commit(types.CLEAR_WECHATJSSIGN)
}
