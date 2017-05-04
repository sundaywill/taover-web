/**
 * Created by sunday on 05/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchAddresses = (data) => {
  store.commit(types.FETCH_ADDRESSES, data)
}

export const fetchAddressesSetDefault = (data) => {
  store.commit(types.FETCH_ADDRESSES_SETDEFAULT, data)
}

export const clearAddress = () => {
  store.commit(types.CLEAR_ADDRESS)
}
