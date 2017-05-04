
import store from './../../store'
import { fetchZan } from './../../store/modules/vote/actions'

export default (data, index) => {
  fetchZan(store, data, index)
}
