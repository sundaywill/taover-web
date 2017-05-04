/**
 * Created by sunday on 03/11/2016.
 */
import store from './../../../store'
import * as types from './../../mutation-types'

export const fetchProjects = (data) => {
  store.commit(types.FETCH_PROJECTS, data)
}

export const fetchTastes = (data) => {
  store.commit(types.FETCH_PROJECTS_TASTE, data)
}

export const fetchNews = (data) => {
  store.commit(types.FETCH_PROJECTS_NEW, data)
}

export const fetchBests = (data) => {
  store.commit(types.FETCH_PROJECTS_BEST, data)
}

export const fetchHots = (data) => {
  store.commit(types.FETCH_PROJECTS_HOT, data)
}

export const clearProject = () => {
  store.commit(types.CLEAR_PROJECT)
}

