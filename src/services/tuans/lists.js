/**
 * Created by sunday on 22/11/2016.
 */
import Vue from 'vue'
import { fetchTuans } from './../../store/modules/tuans/actions'

export default (type, skip, take) => {
  Vue.http.get(`tuans/index?type=${type}&skip=${skip}&take=${take}`).then(
    ({ data }) => {
      fetchTuans({ type: type, skip: skip, take: take, list: data })
    }, (response) => {}
  )
}
