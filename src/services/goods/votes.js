/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchVotes } from './../../store/modules/goods/actions'

export default (id) => {
  Vue.http.get(`goods/votes?id=${id}`).then(
    ({ data }) => {
      fetchVotes(data)
    }, (response) => {}
  )
}
