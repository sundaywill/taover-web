/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchProject } from './../../store/modules/goods/actions'

export default (id) => {
  Vue.http.get(`goods/project?id=${id}`).then(
    ({ data }) => {
      fetchProject(data)
    }, (response) => {
      window.router.replace('/')
    }
  )
}
