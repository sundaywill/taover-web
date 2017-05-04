/**
 * Created by sunday on 22/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchOrders = (data) => {
  store.commit(types.FETCH_ORDERS, data)
}

export const fetchOrdersChange = (data) => {
  store.commit(types.FETCH_ORDERS_CHANGE, data)
}

export const fetchOrdersCount = (data) => {
  store.commit(types.FETCH_ORDERS_COUNT, data)
}

export const clearOrders = () => {
  store.commit(types.CLEAR_ORDERS)
}
