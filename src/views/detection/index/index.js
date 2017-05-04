/**
 * Created by sunday on 07/11/2016.
 */
import loader from './../../../router/loader'
import SCircle from './../../../components/circle/s-circle.vue'

export default {
  name: 'Detection',

  data () {
    return {
      id: this.$route.query.id,
      detection: [],
      list: [],
      title: '',
      maxNum: 100
    }
  },

  mounted () {
    var self = this
    self.$http.get(`detec/index?id=` + self.id).then(
      ({ data }) => {
        self.detection = data
        self.maxNum = data.count
        self.$refs.detection.$emit('$detection:start')
        var list = data.detections
        if (list) {
          var titles = ['生物毒素', '重金属', '杀虫剂', '杀菌剂', '调节剂', '添加剂', '除草剂']
          var count = titles.length, di = Math.floor(250000 / self.maxNum), i = 0, item = []
          var timer = setInterval(function () {
            item = { 'count': list[i], 'title': titles[i] }
            self.list.push(item)
            if (i >= count - 1) {
              clearInterval(timer)
            }
            i++
          }, di)
        }
      }, (response) => {
        console.log(response)
      })
  },

  created () {
    var self = this
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'ProjectDetection', DetectionId: self.id })
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot'),
    SCircle: SCircle
  }
}
