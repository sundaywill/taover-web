/**
 * Created by sunday on 05/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/address'
import redeemService from './../../../services/redeem'

export default {
  name: 'RedeemAddress',

  computed: {
    addresses () { return this.$store.state.address.list },
    address_id () { return this.$store.state.redeem.address.address_id }
  },

  created () {
    var self = this
    if (self.addresses.length <= 0)
      service.list()
  },

  methods: {
    refresh (id) {
      var self = this
      service.list()
      setTimeout(function () {
        self.$refs.top.onLoaded(id)
      }, 500)
    },
    choose (item) {
      redeemService.address(item)
      history.go(-1)
    }
  },

  components: {
    Layout: loader.layout('app'),
    RefreshLoading: loader.component('refreshLoading')
  }
}
