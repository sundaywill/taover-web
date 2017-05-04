/**
 * Created by sunday on 08/11/2016.
 */
import loader from './../../../router/loader'
import Bar from './../../../components/charts/bar.vue'

export default {
  computed: {
  },

  data () {
    return {
      datasets: [
        {
          title: '问题1：这个红心猕猴桃和你平常在市场买的红心猕猴桃对比？',
          labels: ['会 26.27%', '不会 73.53%'],
          data: [26.27, 73.53]
        },
        {
          title: '问题1：这个红心猕猴桃和你平常在市场买的红心猕猴桃对比？',
          labels: ['会 26.27%', '不会 73.53%'],
          data: [26.27, 73.53]
        },
        {
          title: '问题1：这个红心猕猴桃和你平常在市场买的红心猕猴桃对比？',
          labels: ['会 26.27%', '不会 73.53%'],
          data: [26.27, 73.53]
        }
      ]
    }
  },

  mounted () {
    var self = this
  },

  methods: {
  },

  components: {
    Layout: loader.layout('app'),
    Bar
  }
}
