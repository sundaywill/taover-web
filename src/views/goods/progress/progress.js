/**
 * Created by sunday on 08/11/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'GoodsProgress',

  data () {
    return {
      progress: []
    }
  },

  created () {
    var self = this
    var id = self.$route.query.id
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ProjectProgress', ProjectId: id })
    if (id > 0) {
      self.$http.get(`article/progress?id=${id}`).then(
        ({ data }) => { self.progress = data },
        (response) => { window.router.replace('/') })
    } else {
      window.router.replace('/')
    }
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
