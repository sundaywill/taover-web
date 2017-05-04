/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchProgress } from './../../store/modules/goods/actions'

export default (id) => {
  Vue.http.get(`goods/progress?id=${id}`).then(
    ({ data }) => {
      fetchProgress(data)
    }, (response) => {}
  )
}
