/**
 * Created by sunday on 05/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchCode = (data) => {
  store.commit(types.FETCH_REDEEM_CODE, data)
}

export const fetchGoods = (data) => {
  store.commit(types.FETCH_REDEEM_GOODS, data)
}

export const fetchAddress = (data) => {
  store.commit(types.FETCH_REDEEM_ADDRESS, data)
}

export const clearRedeem = () => {
  store.commit(types.CLEAR_REDEEM)
}
