/**
 * Created by sunday on 04/11/2016.
 */
import Vue from 'vue'
import { fetchWechatJsSign } from './../../store/modules/wechat/actions'

export default (url, apiList = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage'
]) => {
  Vue.http.get(`wechat/jsSign?url=${url}`).then(
    ({ data }) => {
      fetchWechatJsSign(data, apiList)
    }, (response) => {})
}
