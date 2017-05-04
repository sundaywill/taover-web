/**
 * Created by sunday on 22/11/2016.
 */
import Vue from 'vue'
import { fetchCyclesCount } from './../../store/modules/cycles/actions'

export default () => {
  Vue.http.get(`cycles/counts`).then(
    ({ data }) => {
      fetchCyclesCount(data)
    }, (response) => {}
  )
}
