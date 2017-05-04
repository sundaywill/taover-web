import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchProject = (data) => {
  store.commit(types.FETCH_VOTE_COMMENTS_PROJECT, data)
}

export const fetchComments = (data) => {
  store.commit(types.FETCH_VOTE_COMMENTS, data)
}

export const fetchReply = (data) => {
  store.commit(types.FETCH_VOTE_COMMENTS_REPLY, data)
}

export const fetchZan = (data) => {
  store.commit(types.FETCH_VOTE_COMMENTS_ZAN, data)
}

export const clearVoteComment = () => {
  store.commit(types.CLEAR_VOTE_COMMENT)
}
