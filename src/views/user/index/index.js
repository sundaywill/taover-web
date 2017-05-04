/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/user'
import orderService from './../../../services/orders'
import tuanService from './../../../services/tuans'
import authService from './../../../services/auth'

export default {
  name: 'User',

  data() {
    return {
      integrals: [10, 20, 30, 40, 80, 80, 80]
    }
  },

  computed: {
    user () { return this.$store.state.user },
    orders () { return this.$store.state.orders.counts },
    tuans () { return this.$store.state.tuans.counts }
  },

  created () {
    var self = this
    service.me()
    service.info()
    orderService.counts()
    tuanService.counts()
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'UserCenter' })
  },

  methods: {
    refresh (id) {
      var self = this
      service.me()
      service.info()
      orderService.counts()
      tuanService.counts()
      setTimeout(function () {
        self.$refs.top.onLoaded(id)
      }, 500)
    },
    logout () {
      authService.logout()
      window.router.push({
        path: '/login',
        query: {
          jump: this.$route.fullPath
        }
      })
    }
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot'),
    RefreshLoading: loader.component('refreshLoading')
  }
}
