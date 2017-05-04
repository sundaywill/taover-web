/**
 * Created by sunday on 02/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchProject = (data) => {
  store.commit(types.FETCH_GOODS_PROJECT, data)
}

export const fetchVotes = (data) => {
  store.commit(types.FETCH_GOODS_VOTES, data)
}

export const fetchProgress = (data) => {
  store.commit(types.FETCH_GOODS_PROGRESS, data)
}

export const fetchGoods = (data) => {
  store.commit(types.FETCH_GOODS_GOODS, data)
}

export const fetchComments = (data) => {
  store.commit(types.FETCH_GOODS_COMMENTS, data)
}

export const clearGoods = () => {
  store.commit(types.CLEAR_GOODS)
}

