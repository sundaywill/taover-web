/**
 * Created by sunday on 02/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchHome = (data) => {
  store.commit(types.FETCH_HOME, data)
}

export const clearHome = () => {
  store.commit(types.CLEAR_HOME)
}
