/**
 * Created by sunday on 05/11/2016.
 */
import {
  FETCH_ADDRESSES,
  FETCH_ADDRESSES_SETDEFAULT,
  CLEAR_ADDRESS
} from './../../mutation-types'

export const mutations = {
  [FETCH_ADDRESSES](state, data) {
    state.list = data
  },

  [FETCH_ADDRESSES_SETDEFAULT](state, data) {
    for (var i in state.list) {
      if (state.list[i].address_id == data.id)
        state.list[i].is_default = 0
    }
    state.list[data.index].is_default = 1
  },

  [CLEAR_ADDRESS](state) {
    state.list = []
    state.skip = 0
    state.take = 10
    state.more = true
  }
}
