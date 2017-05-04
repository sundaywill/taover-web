/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'
import { login } from './../../store/modules/auth/actions'

export default (user) => {
  Vue.http.post('register', user).then(
    ({ data })=> {
      login(data.token)
      window.router.push('/user')
    }, (response) => {
      console.log(response)
    })
}
