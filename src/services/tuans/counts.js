/**
 * Created by sunday on 22/11/2016.
 */
import Vue from 'vue'
import { fetchTuansCount } from './../../store/modules/tuans/actions'

export default () => {
  Vue.http.get(`tuans/counts`).then(
    ({ data }) => {
      fetchTuansCount(data)
    }, (response) => {}
  )
}

