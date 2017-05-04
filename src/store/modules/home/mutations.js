/**
 * Created by sunday on 02/11/2016.
 */
import {
  FETCH_HOME,
  CLEAR_HOME
} from './../../mutation-types'

export const mutations = {
  [FETCH_HOME] (state, data) {
    state.slides = data.slides
    state.banners = data.banners
    state.projects = data.projects
  },

  [CLEAR_HOME] (state) {
    state.slides = []
    state.banners = []
    state.projects = []
  }
}
