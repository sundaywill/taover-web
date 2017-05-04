/**
 * Created by sunday on 02/11/2016.
 */
import {
  FETCH_GOODS_PROJECT,
  FETCH_GOODS_VOTES,
  FETCH_GOODS_PROGRESS,
  FETCH_GOODS_GOODS,
  FETCH_GOODS_COMMENTS,
  CLEAR_GOODS
} from './../../mutation-types'

export const mutations = {
  [FETCH_GOODS_PROJECT] (state, data) {
    state.project = data
  },

  [FETCH_GOODS_VOTES] (state, data) {
    state.votes = data
  },

  [FETCH_GOODS_PROGRESS] (state, data) {
    state.progress = data
  },

  [FETCH_GOODS_GOODS] (state, data) {
    state.goods = data
  },

  [FETCH_GOODS_COMMENTS] (state, data) {
    state.comments = data
  },

  [CLEAR_GOODS] (state) {
    state.project = []
    state.votes = []
    state.progress = []
    state.goods = []
    state.comments = []
  }
}
