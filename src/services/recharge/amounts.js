/**
 * Created by sunday on 06/11/2016.
 */
import Vue from 'vue'
import { fetchRechargesAmount } from './../../store/modules/recharge/actions'

export default () => {
  Vue.http.get(`recharges/index`).then(
    ({ data }) => {
      fetchRechargesAmount(data)
    }, (response) => {})
}
