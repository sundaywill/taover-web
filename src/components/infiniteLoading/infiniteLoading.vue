<template>
  <div class="infinite-container" style="width: 100%">
    <slot>
      <div class="center silver p2">
        <a class="btn more" v-if="complete">没有更多了</a>
        <i class="icon-spinner spinning" v-else></i>
      </div>
    </slot>
  </div>
</template>
<script lang="babel">
  export default {
    props: {
      onInfinite: Function
    },
    data () {
      return {
        scrollParent: null,
        scrollHandler: null,
        loading: true,
        complete: false
      }
    },
    created () {
      var self = this
      self.$on('$InfiniteLoading:loaded', function () {
        self.loading = true
        self.complete = false
      })
      self.$on('$InfiniteLoading:complete', function () {
        self.loading = false
        self.complete = true
        self.bindScroll()
      })
    },
    mounted () {
      var self = this
      self.scrollParent = self.getScrollParent(self.$el)
      self.scrollHandler = self.scrollHandlerOriginal.bind(self)
      setTimeout(self.scrollHandler, 1)
      self.bindScroll()
    },
    destroyed () {
      var self = this
      if (!self.complete)
        self.unbindScroll()
      self.loading = false
    },
    methods: {
      bindScroll () {
        var self = this
        self.scrollParent.addEventListener('scroll', self.scrollHandler)
      },
      unbindScroll () {
        var self = this
        self.scrollParent.removeEventListener('scroll', self.scrollHandler)
      },
      getScrollParent (elm) {
        if (elm.tagName === 'BODY') {
          return window
        } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
          return elm
        }
        return this.getScrollParent(elm.parentNode)
      },
      getDistance (elm) {
        const innerHeight = elm === window ? window.innerHeight : parseInt(styles.height, 10)
        const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop
        return document.documentElement.scrollHeight - innerHeight - scrollTop
      },
      scrollHandlerOriginal () {
        var self = this
        const distance = self.getDistance(self.scrollParent)
        if (self.loading && distance <= 60) {
          self.loading = false
          if (self.onInfinite)
            self.onInfinite.call()
        }
      }
    }
  }
</script>
