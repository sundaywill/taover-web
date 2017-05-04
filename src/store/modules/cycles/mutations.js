/**
 * Created by sunday on 22/11/2016.
 */
import {
  FETCH_CYCLES,
  FETCH_CYCLES_CHANGE,
  FETCH_CYCLES_COUNT,
  CLEAR_CYCLES
} from './../../mutation-types'

export const mutations = {
  [FETCH_CYCLES] (state, data) {
    switch (data.type) {
      case 0:
        state.lists = state.orders
        break
      case 1:
        state.lists = state.unpaid
        break
      case 2:
        state.lists = state.unshipping
        break
      case 3:
        state.lists = state.unreceive
        break
      case 4:
        state.lists = state.unvote
        break
      case 5:
        state.lists = state.refund
        break
      default:
        state.lists = state.orders
        break
    }

    state.lists.skip = data.skip
    state.lists.take = data.take
    var count = data.list.length
    if (state.lists.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.lists.list.push(data.list[i])
      }
    } else {
      state.lists.list = data.list
    }
    state.lists.skip += count
    state.lists.more = count >= state.lists.take

    switch (data.type) {
      case 0:
        state.orders = state.lists
        break
      case 1:
        state.unpaid = state.lists
        break
      case 2:
        state.unshipping = state.lists
        break
      case 3:
        state.unreceive = state.lists
        break
      case 4:
        state.unvote = state.lists
        break
      case 5:
        state.refund = state.lists
        break
      default:
        state.orders = state.lists
        break
    }
  },

  [FETCH_CYCLES_CHANGE] (state, data) {
    switch (data) {
      case 0:
        state.lists = state.orders
        break
      case 1:
        state.lists = state.unpaid
        break
      case 2:
        state.lists = state.unshipping
        break
      case 3:
        state.lists = state.unreceive
        break
      case 4:
        state.lists = state.unvote
        break
      case 5:
        state.lists = state.refund
        break
      default:
        state.lists = state.orders
        break
    }
  },

  [FETCH_CYCLES_COUNT] (state, data) {
    state.counts.orders = data.orders
    state.counts.unpaid = data.unpaid
    state.counts.unshipping = data.unshipping
    state.counts.unreceive = data.unreceive
    state.counts.unvote = data.unvote
    state.counts.refund = data.refund
  },

  [CLEAR_CYCLES] (state) {
    let base = {
      list: [],
      skip: 0,
      take: 10,
      more: true
    }
    state.lists = {
      orders: base,
      unpaid: base,
      unshipping: base,
      unreceive: base,
      unvote: base,
      refund: base,
      lists: base,
    }
    state.counts = {
      orders: 0,
      unpaid: 0,
      unshipping: 0,
      unreceive: 0,
      unvote: 0,
      refund: 0
    }
  }
}
