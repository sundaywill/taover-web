/**
 * Created by sunday on 06/11/2016.
 */
import {
  FETCH_INVITES,
  CLEAR_INVITE
} from './../../mutation-types'

export const mutations = {
  [FETCH_INVITES](state, data) {
    state.lucky = data.lucky
    state.friends = data.friends
  },

  [CLEAR_INVITE](state) {
    state.lucky = ''
    state.friends = []
  }
}
