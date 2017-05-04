/**
 * Created by sunday on 05/11/2016.
 */
import Vue from 'vue'
import { fetchAddresses } from './../../store/modules/address/actions'

export default () => {
  Vue.http.get('address/index').then(
    ({ data }) => {
      fetchAddresses(data)
    },
    (response) => {
      console.log(response.data)
    })
}
