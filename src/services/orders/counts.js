/**
 * Created by sunday on 22/11/2016.
 */
import Vue from 'vue'
import { fetchOrdersCount } from './../../store/modules/orders/actions'

export default () => {
  Vue.http.get(`orders/counts`).then(
    ({ data }) => {
      fetchOrdersCount(data)
    }, (response) => {}
  )
}
