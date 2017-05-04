/**
 * Created by sunday on 22/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchCycles = (data) => {
  store.commit(types.FETCH_CYCLES, data)
}

export const fetchCyclesChange = (data) => {
  store.commit(types.FETCH_CYCLES_CHANGE, data)
}

export const fetchCyclesCount = (data) => {
  store.commit(types.FETCH_CYCLES_COUNT, data)
}

export const clearCycles = () => {
  store.commit(types.CLEAR_CYCLES)
}
