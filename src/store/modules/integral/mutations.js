/**
 * Created by sunday on 03/11/2016.
 */
import {
  FETCH_INTEGRALS,
  CLEAR_INTEGRAL
} from './../../mutation-types'

export const mutations = {
  [FETCH_INTEGRALS](state, data) {
    state.integrals.skip = data.skip
    state.integrals.take = data.take
    var count = data.list.length
    if (state.integrals.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.integrals.list.push(data.list[i])
      }
    } else {
      state.integrals.list = data.list
    }
    state.integrals.skip += count
    state.integrals.more = count >= state.integrals.take
    state.integrals.points = data.points
    state.integrals.rank = data.rank
    state.integrals.need = data.need
    state.integrals.next = data.next
  },

  [CLEAR_INTEGRAL](state) {
    state.integrals = []
  }
}
