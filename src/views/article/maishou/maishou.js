/**
 * Created by sunday on 06/11/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'Maishou',

  data () {
    return {
      maishou: []
    }
  },

  created () {
    var self = this
    var id = self.$route.query.id
    if (id > 0) {
      self.$http.get(`article/maishou?id=${id}`).then(
        ({ data }) => { self.maishou = data },
        (response) => { window.router.replace('/') })
    } else {
      window.router.replace('/')
    }
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'Maishou', MaishouId: id })
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
