/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchGoods } from './../../store/modules/goods/actions'

export default (id) => {
  Vue.http.get(`goods/goods?id=${id}`).then(
    ({ data }) => {
      fetchGoods(data)
    }, (response) => {}
  )
}
