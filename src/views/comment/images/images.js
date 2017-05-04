/**
 * Created by sunday on 06/11/2016.
 */
import loader from './../../../router/loader'
import { Gallery, GalleryItem } from './../../../components/gallery'

export default {
  name: 'CommentImages',

  data () {
    return {
      loading: false,
      images: []
    }
  },

  computed: {
    list () { return this.$store.state.comment.list }
  },

  created () {
    var self = this
    if (self.list.length == 0) {
      window.router.replace('/')
    } else {
      var imageList = self.list[self.$route.query.i].imgs
      for (var index in imageList) {
        if (index == self.$route.query.a)
          self.images.unshift(imageList[index])
        else
          self.images.push(imageList[index])
      }
    }
  },

  components: {
    Layout: loader.layout('base'),
    Gallery: Gallery,
    GalleryItem: GalleryItem
  }
}
