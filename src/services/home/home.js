/**
 * Created by sunday on 02/11/2016.
 */
import Vue from 'vue'
import { fetchHome } from './../../store/modules/home/actions'

export default () => {
  Vue.http.get(`home/index`).then(
    ({ data }) => {
      fetchHome(data)
    },
    (response) => {
      console.log(response)
    }
  )
}
