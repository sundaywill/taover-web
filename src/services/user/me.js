/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchMe } from './../../store/modules/user/actions'

export default () => {
  Vue.http.get('user/me').then(
    ({ data }) => {
      fetchMe(data)
    },
    (response) => {
      console.log(response)
    })
}
