
import store from './../../store'
import { fetchReply } from './../../store/modules/vote/actions'

export default (data, index) => {
  fetchReply(store, data, index)
}
