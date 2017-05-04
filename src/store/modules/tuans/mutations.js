/**
 * Created by sunday on 22/11/2016.
 */
import {
  FETCH_TUANS,
  FETCH_TUANS_CHANGE,
  FETCH_TUANS_COUNT,
  CLEAR_TUANS
} from './../../mutation-types'

export const mutations = {
  [FETCH_TUANS] (state, data) {
    switch (data.type) {
      case 0:
        state.lists = state.tuans
        break
      case 1:
        state.lists = state.unopen
        break
      case 2:
        state.lists = state.undone
        break
      case 3:
        state.lists = state.success
        break
      case 4:
        state.lists = state.fail
        break
      default:
        state.lists = state.tuans
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
        state.tuans = state.lists
        break
      case 1:
        state.unopen = state.lists
        break
      case 2:
        state.undone = state.lists
        break
      case 3:
        state.success = state.lists
        break
      case 4:
        state.fail = state.lists
        break
      default:
        state.tuans = state.lists
        break
    }
  },

  [FETCH_TUANS_CHANGE] (state, data) {
    switch (data) {
      case 0:
        state.lists = state.tuans
        break
      case 1:
        state.lists = state.unopen
        break
      case 2:
        state.lists = state.undone
        break
      case 3:
        state.lists = state.success
        break
      case 4:
        state.lists = state.fail
        break
      default:
        state.lists = state.tuans
        break
    }
  },

  [FETCH_TUANS_COUNT] (state, data) {
    state.counts.tuans = data.tuans
    state.counts.unopen = data.unopen
    state.counts.undone = data.undone
    state.counts.success = data.success
    state.counts.fail = data.fail
  },

  [CLEAR_TUANS] (state) {
    let base = {
      list: [],
      skip: 0,
      take: 10,
      more: true
    }
    state.lists = {
      tuans: base,
      unopen: base,
      undone: base,
      success: base,
      fail: base,
      lists: base,
    }
    state.counts = {
      tuans: 0,
      unopen: 0,
      undone: 0,
      success: 0,
      fail: 0
    }
  }
}
