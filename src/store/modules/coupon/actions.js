/**
 * Created by sunday on 03/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchCoupons = (data) => {
  store.commit(types.FETCH_COUPONS, data)
}

export const fetchInvalid = (data) => {
  store.commit(types.FETCH_COUPONS_INVALID, data)
}

export const clearCoupon = () => {
  store.commit(types.CLEAR_COUPON)
}
