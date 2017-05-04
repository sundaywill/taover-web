/**
 * Created by sunday on 04/11/2016.
 */
import { fetchZan } from './../../store/modules/comment/actions'

export default (data, index) => {
  fetchZan({ index: index, list: data })
}
