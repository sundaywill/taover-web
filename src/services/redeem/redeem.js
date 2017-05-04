/**
 * Created by sunday on 05/11/2016.
 */
import { fetchCode, fetchGoods, fetchAddress } from './../../store/modules/redeem/actions'

export default (data, code, memo) => {
  fetchCode({ code: code, memo: memo })
  fetchGoods(data.goods)
  fetchAddress(data.address)
}
