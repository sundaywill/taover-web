/**
 * Created by sunday on 03/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchIntegrals = (data) => {
  store.commit(types.FETCH_INTEGRALS, data)
}

export const clearIntegral = () => {
  store.commit(types.CLEAR_INTEGRAL)
}

