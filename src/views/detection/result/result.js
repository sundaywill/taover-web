/**
 * Created by sunday on 07/11/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'DetectionResult',

  data () {
    return {
      id: this.$route.query.id,
      scan_img: '',
    }
  },

  mounted () {
    var self = this
    self.$http.get(`detec/result?id=` + self.id).then(
      ({ data }) => {
        self.scan_img = data
      }, (response) => {
        console.log(response)
      })
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ProjectDetectionResult', DetectionId: self.id })
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
