/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchInfo } from './../../store/modules/user/actions'

export default () => {
  Vue.http.get('user/index').then(
    ({ data }) => {
      fetchInfo(data)
    },
    (response) => {
      console.log(response)
    })
}
