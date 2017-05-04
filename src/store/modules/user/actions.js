/**
 * Created by sunday on 03/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchMe = (data) => {
  store.commit(types.FETCH_ME, data)
}

export const fetchInfo = (data) => {
  store.commit(types.FETCH_INFO, data)
}

export const clearUser = () => {
  store.commit(types.CLEAR_USER)
}
