
import { state as base } from './state'
import {
  FETCH_VOTE_COMMENTS_PROJECT,
  FETCH_VOTE_COMMENTS,
  FETCH_VOTE_COMMENTS_REPLY,
  FETCH_VOTE_COMMENTS_ZAN,
  CLEAR_VOTE_COMMENT,
} from './../../mutation-types'

export const mutations = {
  [FETCH_VOTE_COMMENTS_PROJECT](state, data) {
    state.project = data
  },

  [FETCH_VOTE_COMMENTS](state, data) {
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

  [FETCH_VOTE_COMMENTS_REPLY](state, data) {
    var i = data.index
    if (i > 0) {
      if (!state.list[i].replies)
        state.list[i].replies = []
      state.list[i].replies.unshift(data.item)
    } else {
      state.list.unshift(data.item)
    }
  },

  [FETCH_VOTE_COMMENTS_ZAN](state, data) {
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

  [CLEAR_VOTE_COMMENT](state) {
    state.project = []
    state.list = []
    state.skip = 0
    state.take = 10
    state.more = true
  }
}
