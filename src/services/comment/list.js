/**
 * Created by sunday on 04/11/2016.
 */
import Vue from 'vue'
import { fetchComments } from './../../store/modules/comment/actions'

export default (id, skip = 0, take = 10) => {
  Vue.http.get(`comments/comments?id=${id}&skip=${skip}&take=${take}`).then(
    ({ data }) => {
      fetchComments({ list: data, skip: skip, take: take })
    }, (response) => {}
  )
}
