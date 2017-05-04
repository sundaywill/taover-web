/**
 * Created by sunday on 02/12/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/address'

export default {
  name: 'Address',

  data () {
    return {
      default_id: 1
    }
  },

  computed: {
    addresses () { return this.$store.state.address.list }
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

    setDefault (index, id) {
      var self = this
      self.$http.post('address/setDefault', { id: id }).then(
        ({ data }) => {
          if (data.id != id)
            service.setDefault(index, data.id)
        },
        (response) => {}
      )
    }
  },

  components: {
    Layout: loader.layout('app'),
    RefreshLoading: loader.component('refreshLoading')
  }
}

