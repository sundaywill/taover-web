/**
 * Created by sunday on 02/11/2016.
 */
export default {
  data () {
    return {
      showGoTop: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll () {
      this.showGoTop = (document.documentElement.scrollTop
        || window.pageYOffset || document.body.scrollTop) > 2500
    },
    goTop () {
      var interval = setInterval(function () {
        if (document.documentElement.scrollTop + document.body.scrollTop <= 0)
          clearInterval(interval)
        window.scrollBy(0, -100)
      }, 1)
    }
  }
}
