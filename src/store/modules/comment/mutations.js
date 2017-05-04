/**
 * Created by sunday on 03/11/2016.
 */
import {
  FETCH_COMMENTS_PROJECT,
  FETCH_COMMENTS_LIST,
  FETCH_COMMENTS_REPLY,
  FETCH_COMMENTS_ZAN,
  CLEAR_COMMENT,
} from './../../mutation-types'

export const mutations = {
  [FETCH_COMMENTS_PROJECT](state, data) {
    state.project = data
  },

  [FETCH_COMMENTS_LIST](state, data) {
    state.skip = data.skip
    state.take = data.take
    var count = data.list.length
    if (state.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.list.push(data.list[i])
      }
    } else {
      state.list = data.list
    }
    state.skip += count
    state.more = count >= state.take
  },

  [FETCH_COMMENTS_REPLY](state, data) {
    var i = data.index
    if (i >= 0) {
      if (state.list[i].replies === false)
        state.list[i].replies = []
      state.list[i].replies.push(data.item)
    } else {
      state.list.unshift(data.item)
    }
  },

  [FETCH_COMMENTS_ZAN](state, data) {
    var i = data.index
    state.list[i].zans = data.list
    if (state.list[i].zaned) {
      state.list[i].zaned = false
      state.project.zans -= 1
    } else {
      state.list[i].zaned = true
      state.project.zans += 1
    }
    if (state.project.zans < 0)
      state.project.zans = 0
  },

  [CLEAR_COMMENT](state) {
    state.project = []
    state.list = []
    state.skip = []
    state.take = []
    state.more = []
  }
}
