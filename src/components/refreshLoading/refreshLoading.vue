<template>
  <div class="refresh" :class="{ 'dropped': dropped }"
       :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
    <div class="text">
      <div v-if="status !== 'loading'">下拉刷新</div>
      <div v-if="status == 'loading'"><i class="icon-spinner spinning"></i></div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="babel">
  export default {
    name: 'refresh',
    props: {
      method: {
        type: Function
      },
    },
    data() {
      return {
        uuid: null,
        scrollEventTarget: null,
        dropped: false,
        translate: 0,
        distance: 0,
        startY: 0,
        scrollTop: 0,
        status: 'pull'
      };
    },
    methods: {
      onLoaded (id) {
        if (id === this.uuid) {
          this.translate = 0
          setTimeout(() => {
            this.status = 'pull';
          }, 500)
        }
      },
      getScrollEventTarget (element) {
        let currentNode = element
        while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
          if (overflowY === 'scroll' || overflowY === 'auto')
            return currentNode
          currentNode = currentNode.parentNode
        }
        return window
      },
      getScrollTop (element) {
        if (element === window)
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
        else
          return element.scrollTop
      },
      bindTouchEvents () {
        this.$el.addEventListener('touchstart', this.touchStart)
        this.$el.addEventListener('touchmove', this.touchMove)
        this.$el.addEventListener('touchend', this.touchEnd)
      },
      init () {
        this.status = 'pull'
        this.scrollEventTarget = this.getScrollEventTarget(this.$el)
        if (typeof this.method === 'function')
          this.bindTouchEvents()
      },
      touchStart (e) {
        this.startY = e.touches[0].clientY
        this.scrollTop = this.getScrollTop(this.scrollEventTarget)
        if (this.status !== 'loading') {
          this.status = 'pull'
          this.dropped = false
        }
      },
      touchMove (e) {
        if (this.startY < this.$el.getBoundingClientRect().top)
          return
        this.distance = (e.touches[0].clientY - this.startY) / 2
        if (typeof this.method === 'function' && this.status !== 'loading' &&
          this.distance > 0 && this.getScrollTop(this.scrollEventTarget) === 0) {
          e.preventDefault()
          e.stopPropagation()
          this.translate = this.distance - this.scrollTop
          if (this.translate < 0)
            this.translate = 0
          this.status = this.translate >= 50 ? 'drop' : 'pull'
        }
      },
      touchEnd () {
        if (this.distance > 0 && this.translate > 0 && this.getScrollTop(this.scrollEventTarget) === 0) {
          this.dropped = true
          if (this.status === 'drop') {
            this.translate = '50'
            this.status = 'loading'
            this.method(this.uuid)
          } else {
            this.translate = '0'
            this.status = 'pull'
          }
        }
        this.distance = 0
      }
    },
    mounted () {
      this.uuid = Math.random().toString(36).substring(3, 8)
      this.init()
    }
  }
</script>

<style lang="css" scoped>
  .refresh {
    overflow: hidden;
    margin-top: -50px;
    width: 100%;
    position: relative;
  }
  .refresh .text {
    color: #777;
    text-align: center;
    line-height: 50px;
    height: 50px;
    z-index: 0;
  }
  .refresh.dropped {  transition: .2s;  }
</style>
