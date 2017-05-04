/**
 * Created by sunday on 03/11/2016.
 */
import {
  FETCH_COUPONS,
  FETCH_COUPONS_INVALID,
  CLEAR_COUPON
} from './../../mutation-types'

export const mutations = {
  [FETCH_COUPONS](state, data) {
    state.coupons.skip = data.skip
    state.coupons.take = data.take
    var count = data.list.length
    if (state.coupons.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.coupons.list.push(data.list[i])
      }
    } else {
      state.coupons.list = data.list
    }
    state.coupons.skip += count
    state.coupons.more = count >= state.coupons.take
  },

  [FETCH_COUPONS_INVALID](state, data) {
    state.coupons.skip = data.skip
    state.coupons.take = data.take
    var count = data.list.length
    if (state.invalids.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.invalids.list.push(data.list[i])
      }
    } else {
      state.invalids.list = data.list
    }
    state.invalids.skip += count
    state.invalids.more = count >= state.invalids.take
  },

  [CLEAR_COUPON](state) {
    state.coupons = []
    state.invalids = []
  }
}

