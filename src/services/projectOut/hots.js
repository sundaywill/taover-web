/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { fetchHots } from './../../store/modules/projectOut/actions'

export default (skip = 0, take = 10) => {
  Vue.http.get(`project/hottestOut?skip=${skip}&take=${take}`).then(
    ({ data }) => {
      fetchHots({ list: data, skip: skip, take: take })
    },
    (response) => {
      console.log(response)
    })
}
