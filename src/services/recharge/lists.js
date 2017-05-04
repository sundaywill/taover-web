/**
 * Created by sunday on 28/11/2016.
 */
import Vue from 'vue'
import { fetchRecharges } from './../../store/modules/recharge/actions'

export default (type, skip, take) => {
  var uri = 'incomes'
  if (type == 2)
    uri = 'expends'
  Vue.http.get(`recharges/${uri}?type=${type}&skip=${skip}&take=${take}`).then(
    ({ data }) => {
      fetchRecharges({ type: type, skip: skip, take: take, list: data })
    }, (response) => {}
  )
}
