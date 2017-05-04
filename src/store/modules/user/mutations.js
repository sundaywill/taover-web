/**
 * Created by sunday on 03/11/2016.
 */
import {
  FETCH_ME,
  FETCH_INFO,
  CLEAR_USER
} from './../../mutation-types'

export const mutations = {
  [FETCH_ME](state, data) {
    state.nick = data.nick
    state.avatar = data.avatar
    state.role = data.role
  },

  [FETCH_INFO](state, data) {
    state.level = data.level
    state.rank = data.rank
    state.coupons = data.coupons
    state.balance = data.balance
    state.integral = data.integral
    state.checked = data.checked
    state.checked_count = data.checked_count
  },

  [CLEAR_USER](state) {
    state.nick = ''
    state.avatar = ''
    state.role = 0
    state.level = '看客'
    state.rank = 0
    state.balance = 0.00
    state.coupons = 0
    state.integral = 0
    state.checked = 0
    state.checked_count = 0
  }
}
