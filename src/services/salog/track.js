/**
 * Created by sunday on 29/11/2016.
 */
import Vue from 'vue'

export default (name, query) => {
  Vue.http.post(`salog/track`, { name: name, query: query }).then(({ data }) => {}, (response) => {})
}
