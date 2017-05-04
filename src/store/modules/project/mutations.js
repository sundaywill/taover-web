/**
 * Created by sunday on 03/11/2016.
 */
import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_TASTE,
  FETCH_PROJECTS_NEW,
  FETCH_PROJECTS_BEST,
  FETCH_PROJECTS_HOT,
  CLEAR_PROJECT
} from './../../mutation-types'

export const mutations = {
  [FETCH_PROJECTS] (state, data) {
    state.projects.skip = data.skip
    state.projects.take = data.take
    var count = data.list.length
    if (state.projects.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.projects.list.push(data.list[i])
      }
    } else {
      state.projects.list = data.list
    }
    state.projects.skip += count
    state.projects.more = count >= state.projects.take
  },

  [FETCH_PROJECTS_TASTE] (state, data) {
    state.tastes.skip = data.skip
    state.tastes.take = data.take
    var count = data.list.length
    if (state.tastes.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.tastes.list.push(data.list[i])
      }
    } else {
      state.tastes.list = data.list
    }
    state.tastes.skip += count
    state.tastes.more = count >= state.tastes.take
  },

  [FETCH_PROJECTS_NEW] (state, data) {
    state.news.skip = data.skip
    state.news.take = data.take
    var count = data.list.length
    if (state.news.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.news.list.push(data.list[i])
      }
    } else {
      state.news.list = data.list
    }
    state.news.skip += count
    state.news.more = count >= state.news.take
  },

  [FETCH_PROJECTS_BEST] (state, data) {
    state.bests.skip = data.skip
    state.bests.take = data.take
    var count = data.list.length
    if (state.bests.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.bests.list.push(data.list[i])
      }
    } else {
      state.bests.list = data.list
    }
    state.bests.skip += count
    state.bests.more = count >= state.bests.take
  },

  [FETCH_PROJECTS_HOT] (state, data) {
    state.hots.skip = data.skip
    state.hots.take = data.take
    var count = data.list.length
    if (state.hots.skip > 0) {
      for (var i = 0; i < count; i++) {
        state.hots.list.push(data.list[i])
      }
    } else {
      state.hots.list = data.list
    }
    state.hots.skip += count
    state.hots.more = count >= state.hots.take
  },

  [CLEAR_PROJECT] (state) {
    state.projects = {
      list: [],
      more: true,
      skip: 0,
      take: 10
    }
    state.tastes = {
      list: [],
      more: true,
      skip: 0,
      take: 10
    }
    state.news = {
      list: [],
      more: true,
      skip: 0,
      take: 10
    }
    state.bests = {
      list: [],
      more: true,
      skip: 0,
      take: 10
    }
    state.hots = {
      list: [],
      more: true,
      skip: 0,
      take: 10
    }
  }
}
