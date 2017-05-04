/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/coupon'

export default {
  computed: {
    coupons () { return this.$store.state.coupon.coupons }
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'CouponList' })
  },

  methods: {
    refresh (id) {
      var self = this
      service.coupons(0, 10)
      setTimeout(function () {
        self.$refs.top.onLoaded(id)
      }, 500)
    },
    onInfinite () {
      var self = this
      if (self.coupons.more) {
        self.getList(self.coupons.skip, self.coupons.take)
        self.$emit('$InfiniteLoading:loaded')
      } else {
        self.$emit('$InfiniteLoading:complete')
      }
    },
    getList (skip, take) {
      service.coupons(skip, take)
    }
  },

  components: {
    Layout: loader.layout('app'),
    RefreshLoading: loader.component('refreshLoading'),
    InfiniteLoading: loader.component('infiniteLoading')
  }
}
