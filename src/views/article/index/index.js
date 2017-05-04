/**
 * Created by sunday on 06/11/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'Article',

  data () {
    var self = this
    return {
      pid: this.$route.query.pid,
      article: [],
      isArticle: false
    }
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'Article', ArticleId: self.$route.query.id })
  },

  mounted () {
    var self = this
    var id = self.$route.query.id
    var project_id = self.pid
    if (id > 0) {
      self.$http.get(`article/index?id=${id}&pid=${project_id}`).then(
        ({ data }) => { self.article = data },
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
