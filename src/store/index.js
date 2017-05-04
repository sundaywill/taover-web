import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import wechat from './modules/wechat'
import home from './modules/home'
import auth from './modules/auth'
import user from './modules/user'
import coupon from './modules/coupon'
import integral from './modules/integral'
import orders from './modules/orders'
import tuans from './modules/tuans'
import cycles from './modules/cycles'
import address from './modules/address'
import redeem from './modules/redeem'
import recharge from './modules/recharge'
import invite from './modules/invite'
import project from './modules/project'
import projectOut from './modules/projectOut'
import goods from './modules/goods'
import comment from './modules/comment'
import vote from './modules/vote'

const store = new Vuex.Store({
  modules: {
    wechat,
    home,
    auth,
    user,
    coupon,
    integral,
    orders,
    tuans,
    cycles,
    address,
    redeem,
    recharge,
    invite,
    project,
    projectOut,
    goods,
    comment,
    vote,
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
