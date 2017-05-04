/**
 * Created by sunday on 03/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchProject = (data) => {
  store.commit(types.FETCH_COMMENTS_PROJECT, data)
}

export const fetchComments = (data) => {
  store.commit(types.FETCH_COMMENTS_LIST, data)
}

export const fetchReply = (data) => {
  store.commit(types.FETCH_COMMENTS_REPLY, data)
}

export const fetchZan = (data) => {
  store.commit(types.FETCH_COMMENTS_ZAN, data)
}

export const clearComment = () => {
  store.commit(types.CLEAR_COMMENT)
}

