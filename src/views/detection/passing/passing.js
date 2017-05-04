/**
 * Created by sunday on 07/11/2016.
 */
import loader from './../../../router/loader'
import PCircle from './../../../components/circle/p-circle.vue'

export default {
  name: 'DetectionPassing',

  data() {
    return {
      id: this.$route.query.id,
      detections: [],
      article: '',
      scan_img: '',
    }
  },

  mounted () {
    var self = this
    self.$http.get(`detec/passing?id=` + self.id).then(
      ({ data }) => {
        self.detections = data.detections
        self.article = data.article
        self.scan_img = data.scan_img
      }, (response) => {
        console.log(response)
      })
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ProjectDetectionPassing', DetectionId: self.id })
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot'),
    PCircle: PCircle
  }
}
