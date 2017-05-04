/**
 * Created by sunday on 22/11/2016.
 */
import Vue from 'vue'
import { fetchOrders } from './../../store/modules/orders/actions'

export default (type, skip, take) => {
  Vue.http.get(`orders/index?type=${type}&skip=${skip}&take=${take}`).then(
    ({ data }) => {
      fetchOrders({ type: type, skip: skip, take: take, list: data })
    }, (response) => {}
  )
}
