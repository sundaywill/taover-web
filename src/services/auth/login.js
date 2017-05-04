/**
 * Created by sunday on 03/11/2016.
 */
import { login, logout } from './../../store/modules/auth/actions'

export default (data) => {
  logout()
  login(data.token)
}
