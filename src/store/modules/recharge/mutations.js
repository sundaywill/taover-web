/**
 * Created by sunday on 06/11/2016.
 */
import {
  FETCH_RECHARGES,
  FETCH_RECHARGES_CHANGE,
  FETCH_RECHARGES_AMOUNT,
  FETCH_RECHARGES_USECARD,
  CLEAR_RECHARGE
} from './../../mutation-types'

export const mutations = {
  [FETCH_RECHARGES] (state, data) {
    switch (data.type) {
      case 1:
        state.lists = state.incomes
        break
      case 2:
        state.lists = state.expends
        break
      default:
        state.lists = state.incomes
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
      case 1:
        state.incomes = state.lists
        break
      case 2:
        state.expends = state.lists
        break
      default:
        state.incomes = state.lists
        break
    }
  },

  [FETCH_RECHARGES_CHANGE] (state, data) {
    switch (data) {
      case 1:
        state.lists = state.incomes
        break
      case 2:
        state.lists = state.expends
        break
      default:
        state.lists = state.incomes
        break
    }
  },

  [FETCH_RECHARGES_AMOUNT](state, data) {
    state.avatar = data.avatar
    state.amount = data.amount
  },

  [FETCH_RECHARGES_USECARD](state, item) {
    state.incomes.unshift(item)
    state.skipIns += 1
    state.amount = parseFloat((state.amount * 100 + item.body * 100) / 100).toFixed(2)
  },

  [CLEAR_RECHARGE](state) {
    let base = {
      list: [],
      skip: 0,
      take: 10,
      more: true
    }
    state.incomes = base
    state.expends = base
    state.lists = base
    state.avatar = ''
    state.amount = 0.00
  }
}
