import loader from './loader'
import store from './../store'

const routes = [
  // Home Index Resource
  { path: '/', redirect: { path: '/index' } },
  { path: '/index', name: 'Index', component: loader.view('home', 'index'), meta: { auth: false } },

  // Weixin Login Resource
  { path: '/wxLogin', name: 'WxLogin', component: loader.view('auth', 'wxLogin'), meta: { auth: false } },
  // Login Resource
  { path: '/login', name: 'Login', component: loader.view('auth', 'login'), meta: { auth: false } },
  // Register Resource
  { path: '/register', name: 'Register', component: loader.view('auth', 'register'), meta: { auth: false } },
  // Forget Password Resource
  { path: '/forget', name: 'Forget', component: loader.view('auth', 'forget'), meta: { auth: false } },

  // User Center Resource
  { path: '/user', name: 'User', component: loader.view('user', 'index'), meta: { auth: true } },
  // User Reset Password Resource
  { path: '/user/reset', name: 'UserReset', component: loader.view('user', 'reset'), meta: { auth: true } },
  // User Reset Nickname Resource
  { path: '/user/nick', name: 'UserNick', component: loader.view('user', 'nick'), meta: { auth: true } },

  // User Coupons Resource
  { path: '/coupons', name: 'Coupons', component: loader.view('coupon', 'index'), meta: { auth: true } },
  // User Invalid Coupons Resource
  { path: '/coupons/invalid', name: 'CouponsInvalid', component: loader.view('coupon', 'invalid'), meta: { auth: true } },

  // User Integrals Resource
  { path: '/integrals', name: 'Integrals', component: loader.view('integral', 'index'), meta: { auth: true } },
  // User Integrals Rule Resource
  { path: '/integrals/rule', name: 'IntegralsRule', component: loader.view('integral', 'rule'), meta: { auth: false } },

  // Redeem Choose Address Resource
  { path: '/address', name: 'Address', component: loader.view('address', 'index'), meta: { auth: true } },

  // Redeem Resource
  { path: '/redeem', name: 'Redeem', component: loader.view('redeem', 'index'), meta: { auth: true } },
  // Redeem Choose Address Resource
  { path: '/redeem/address', name: 'RedeemAddress', component: loader.view('redeem', 'address'), meta: { auth: true } },

  // Recharge Resource
  { path: '/recharge', name: 'Recharge', component: loader.view('recharge', 'index'), meta: { auth: true } },

  // Checkin Resource
  { path: '/checkin', name: 'Checkin', component: loader.view('checkin', 'index'), meta: { auth: true } },

  // Invite Friends Resource
  // { path: '/invite', name: 'Invite', component: loader.view('invite', 'index'), meta: { auth: true } },
  // Invite Register Resource
  // { path: '/lucky', name: 'InviteLucky', component: loader.view('invite', 'lucky'), meta: { auth: false } },
  // Invite Register Resource
  // { path: '/wait', name: 'InviteWait', component: loader.view('invite', 'wait'), meta: { auth: false } },

  // Order Refund Resource
  { path: '/refund', name: 'Refund', component: loader.view('refund', 'index'), meta: { auth: true } },

  // Order Detail Resource
  { path: '/order/index', name: 'OrderIndex', component: loader.view('order', 'index'), meta: { auth: true } },
  // Orders List Resource
  { path: '/order/orders', name: 'OrderOrders', component: loader.view('order', 'orders'), meta: { auth: true } },
  // Tuans List Resource
  { path: '/order/tuans', name: 'OrderTuans', component: loader.view('order', 'tuans'), meta: { auth: true } },
  // Cycles List Resource
  { path: '/order/cycles', name: 'OrderCycles', component: loader.view('order', 'cycles'), meta: { auth: true } },
  // Cycles List Resource
  { path: '/cycle/index', name: 'CycleIndex', component: loader.view('cycle', 'index'), meta: { auth: true } },

  // All Projects List Resource
  { path: '/project', name: 'Project', component: loader.view('project', 'index'), meta: { auth: false } },
  // Taste Projects List Resource
  { path: '/project/taste', name: 'ProjectTaste', component: loader.view('project', 'taste'), meta: { auth: false } },
  // Newest Projects List Resource
  { path: '/project/new', name: 'ProjectNew', component: loader.view('project', 'new'), meta: { auth: false } },
  // Promotion Projects List Resource
  { path: '/project/best', name: 'ProjectBest', component: loader.view('project', 'best'), meta: { auth: false } },
  // Hottest Projects Resource
  { path: '/project/hot', name: 'ProjectHot', component: loader.view('project', 'hot'), meta: { auth: false } },

  // All Projects Sell Out List Resource
  { path: '/projectOut', name: 'ProjectOut', component: loader.view('projectOut', 'index'), meta: { auth: false } },
  // Taste Projects Sell Out List Resource
  { path: '/projectOut/taste', name: 'ProjectOutTaste', component: loader.view('projectOut', 'taste'), meta: { auth: false } },
  // Newest Projects Sell Out List Resource
  { path: '/projectOut/new', name: 'ProjectOutNew', component: loader.view('projectOut', 'new'), meta: { auth: false } },
  // Promotion Projects Sell Out List Resource
  { path: '/projectOut/best', name: 'ProjectOutBest', component: loader.view('projectOut', 'best'), meta: { auth: false } },
  // Hottest Projects Sell Out Resource
  { path: '/projectOut/hot', name: 'ProjectOutHot', component: loader.view('projectOut', 'hot'), meta: { auth: false } },

  // Detection Resource
  { path: '/detection', name: 'Detection', component: loader.view('detection', 'index'), meta: { auth: false } },
  // Detection Passing Resource
  { path: '/detection/passing', name: 'DetectionPassing', component: loader.view('detection', 'passing'), meta: { auth: false } },
  // Detection Result Resource
  { path: '/detection/result', name: 'DetectionResult', component: loader.view('detection', 'result'), meta: { auth: false } },

  // Maishou Resource
  { path: '/maishou', name: 'Maishou', component: loader.view('article', 'maishou'), meta: { auth: false } },

  // Article Resource
  { path: '/article', name: 'Article', component: loader.view('article', 'index'), meta: { auth: false } },

  // Goods Resource
  { path: '/goods', name: 'Goods', component: loader.view('goods', 'index'), meta: { auth: false },
    beforeEnter: (to, from, next) => {
      if (to.query.id != store.state.goods.project.id)
        store.commit('CLEAR_GOODS')
      next()
    }
  },
  // Goods Progress Resource
  { path: '/goods/progress', name: 'GoodsProgress', component: loader.view('goods', 'progress'), meta: { auth: false } },
  // Goods Progress Resource
  { path: '/goods/sold', name: 'GoodsSold', component: loader.view('goods', 'sold'), meta: { auth: false } },

  // Tuan Join Resource
  { path: '/tuan', name: 'Tuan', component: loader.view('tuan', 'index'), meta: { auth: false } },
  // Tuan Open Resource
  { path: '/tuan/go', name: 'TuanGo', component: loader.view('tuan', 'go'), meta: { auth: true } },

  // Project Comments Resource
  { path: '/comment', name: 'Comment', component: loader.view('comment', 'index'), meta: { auth: false },
    beforeEnter: (to, from, next) => {
      if (to.query.id != store.state.comment.project.id)
        store.commit('CLEAR_COMMENT')
      next()
    }
  },
  // Project Comments Reply Resource
  { path: '/comment/reply', name: 'CommentReply', component: loader.view('comment', 'reply'), meta: { auth: true } },
  // Project Comments Images Preview Resource
  { path: '/comment/images', name: 'CommentImages', component: loader.view('comment', 'images'), meta: { auth: false } },

  // Project Vote List Resource
  { path: '/vote', name: 'Vote', component: loader.view('vote', 'index'), meta: { auth: false } },
  // Project Vote Action Resource
  { path: '/vote/vote', name: 'VoteVote', component: loader.view('vote', 'vote'), meta: { auth: true } },
  // Project Vote Action Resource
  { path: '/vote/reply', name: 'VoteReply', component: loader.view('vote', 'reply'), meta: { auth: true } },
  // Project Vote Action Resource
  { path: '/vote/images', name: 'VoteImages', component: loader.view('vote', 'images'), meta: { auth: false } },
  // Project Vote Action Resource
  { path: '/vote/voteShow', name: 'VoteVoteShow', component: loader.view('vote', 'voteShow'), meta: { auth: false } },
]

export default routes
