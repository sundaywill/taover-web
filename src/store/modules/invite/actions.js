/**
 * Created by sunday on 06/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchInvites = (data) => {
  store.commit(types.FETCH_INVITES, data)
}

export const clearInvite = () => {
  store.commit(types.CLEAR_INVITE)
}
