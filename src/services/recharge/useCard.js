/**
 * Created by sunday on 06/11/2016.
 */
import { fetchUseCard } from './../../store/modules/recharge/actions'

export default (data) => {
  fetchUseCard(data)
  return data.body
}
