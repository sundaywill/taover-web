/**
 * Created by sunday on 22/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchTuans = (data) => {
  store.commit(types.FETCH_TUANS, data)
}

export const fetchTuansChange = (data) => {
  store.commit(types.FETCH_TUANS_CHANGE, data)
}

export const fetchTuansCount = (data) => {
  store.commit(types.FETCH_TUANS_COUNT, data)
}

export const clearTuans = () => {
  store.commit(types.CLEAR_TUANS)
}
