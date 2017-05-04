/**
 * Created by sunday on 04/11/2016.
 */
import { fetchReply } from './../../store/modules/comment/actions'

export default (data, index) => {
  fetchReply({ index: index, item: data })
}
