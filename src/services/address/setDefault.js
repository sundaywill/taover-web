/**
 * Created by sunday on 02/12/2016.
 */
import { fetchAddressesSetDefault } from './../../store/modules/address/actions'

export default (index, id) => {
  fetchAddressesSetDefault({ index: index, id: id })
}
