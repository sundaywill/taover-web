/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchInvalid } from './../../store/modules/coupon/actions'

export default (skip = 0, take = 10) => {
  Vue.http.get(`user/couponsInvalid?skip=${skip}&take=${take}`).then(
    ({ data }) => {
      fetchInvalid({ list: data, skip: skip, take: take })
    },
    (response) => {
      console.log(response)
    })
}

