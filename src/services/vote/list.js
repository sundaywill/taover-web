
import Vue from 'vue'
import store from './../../store'
import { fetchComments } from './../../store/modules/vote/actions'

export default (id, skip = 0, take = 10) => {
  Vue.http.get(`vote/comments?id=${id}&skip=${skip}&take=${take}`).then(
    ({ data }) => {
      fetchComments({ list: data, skip: skip, take: take })
    },
    (response) => {
      console.log(response)
    })
}

