/**
 * Created by sunday on 15/11/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'GoodsSold',

  data () {
    return {
      list: []
    }
  },

  computed: {
    sold () { return this.$store.state.goods.project.sold },
  },

  created () {
    var self = this
    var id = self.$route.query.id
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ProjectSold', ProjectId: id })
    if (id > 0) {
      self.$http.get(`goods/sold?id=${id}`).then(({ data }) => { self.list = data }, (response) => {})
    } else {
      window.router.replace('/')
    }
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
