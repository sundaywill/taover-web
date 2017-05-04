/**
 * Created by sunday on 06/11/2016.
 */
import loader from './../../../router/loader'
import { Gallery, GalleryItem } from './../../../components/gallery'

export default {
  data () {
    return {
      loading: false,
      images: []
    }
  },

  computed: {
    //list () { return this.$store.state.comment.list }
  },

  created () {
    var self = this
    var imageList = self.$route.query.a
    for (var index in imageList) {
      if (index == self.$route.query.i)
        self.images.unshift(imageList[index])
      else
        self.images.push(imageList[index])
    }
  },

  components: {
    Layout: loader.layout('base'),
    Gallery: Gallery,
    GalleryItem: GalleryItem
  }
}
