/**
 * Created by sunday on 03/11/2016.
 */
import { logout } from './../../store/modules/auth/actions'
import { clearAddress } from './../../store/modules/address/actions'
import { clearComment } from './../../store/modules/comment/actions'
import { clearCoupon } from './../../store/modules/coupon/actions'
import { clearCycles } from './../../store/modules/cycles/actions'
import { clearGoods } from './../../store/modules/goods/actions'
import { clearHome } from './../../store/modules/home/actions'
import { clearIntegral } from './../../store/modules/integral/actions'
import { clearInvite } from './../../store/modules/invite/actions'
import { clearOrders } from './../../store/modules/orders/actions'
import { clearProject } from './../../store/modules/project/actions'
import { clearProjectOut } from './../../store/modules/projectOut/actions'
import { clearRecharge } from './../../store/modules/recharge/actions'
import { clearRedeem } from './../../store/modules/redeem/actions'
import { clearTuans } from './../../store/modules/tuans/actions'
import { clearUser } from './../../store/modules/user/actions'
import { clearVoteComment } from './../../store/modules/vote/actions'
import { clearWechatJsSign } from './../../store/modules/wechat/actions'

export default () => {
  logout()
  clearAddress()
  clearComment()
  clearCoupon()
  clearCycles()
  clearGoods()
  clearHome()
  clearIntegral()
  clearInvite()
  clearOrders()
  clearProject()
  clearProjectOut()
  clearRecharge()
  clearRedeem()
  clearTuans()
  clearUser()
  clearVoteComment()
  clearWechatJsSign()
}
