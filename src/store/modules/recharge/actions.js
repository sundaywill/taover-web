/**
 * Created by sunday on 06/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchRecharges = (data) => {
  store.commit(types.FETCH_RECHARGES, data)
}

export const fetchRechargesChange = (data) => {
  store.commit(types.FETCH_RECHARGES_CHANGE, data)
}

export const fetchRechargesAmount = (data) => {
  store.commit(types.FETCH_RECHARGES_AMOUNT, data)
}

export const fetchUseCard = (data) => {
  store.commit(types.FETCH_RECHARGES_USECARD, data)
}

export const clearRecharge = () => {
  store.commit(types.CLEAR_RECHARGE)
}
