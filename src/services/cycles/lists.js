/**
 * Created by sunday on 22/11/2016.
 */
import Vue from 'vue'
import { fetchCycles } from './../../store/modules/cycles/actions'

export default (type, skip, take) => {
  Vue.http.get(`cycles/index?type=${type}&skip=${skip}&take=${take}`).then(
    ({ data }) => {
      fetchCycles({ type: type, skip: skip, take: take, list: data })
    }, (response) => {}
  )
}
