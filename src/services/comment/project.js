/**
 * Created by sunday on 04/11/2016.
 */
import Vue from 'vue'
import { fetchProject } from './../../store/modules/comment/actions'

export default (id) => {
  Vue.http.get(`comments/index?id=${id}`).then(
    ({ data }) => {
      fetchProject(data)
    }, (response) => {}
  )
}
