/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchComments } from './../../store/modules/goods/actions'

export default (id) => {
  Vue.http.get(`goods/comments?id=${id}`).then(
    ({ data }) => {
      fetchComments(data)
    }, (response) => {}
  )
}
