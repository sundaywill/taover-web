/**
 * Created by sunday on 05/11/2016.
 */
import {
  FETCH_REDEEM_CODE,
  FETCH_REDEEM_GOODS,
  FETCH_REDEEM_ADDRESS,
  CLEAR_REDEEM
} from './../../mutation-types'

export const mutations = {
  [FETCH_REDEEM_CODE](state, data) {
    state.memo = data.memo
    state.code = data.code
    state.verified = true
  },

  [FETCH_REDEEM_GOODS](state, data) {
    state.goods = data
  },

  [FETCH_REDEEM_ADDRESS](state, data) {
    state.address = data
  },

  [CLEAR_REDEEM](state) {
    state.memo = null
    state.code = null
    state.verified = false
    state.goods = []
    state.address = []
  }
}
