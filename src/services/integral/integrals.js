/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchIntegrals } from '../../store/modules/integral/actions'

export default (skip = 0, take = 20) => {
  Vue.http.get(`user/integral?skip=${skip}&take=${take}`).then(
    ({ data }) => {
      data.skip = skip
      data.take = take
      fetchIntegrals(data)
    },
    (response) => {
      console.log(response)
    })
}
