<template>
  <transition name="fade" mode="out-in">
    <div class="share-mask" v-show="display" @click="hide">
      <div class="share-main">
        <div class="share-icon">
          <i class="icon-arrow-up"></i>
        </div>
        <div class="share-label">
          <p>点击右上角分享到朋友圈或朋友</p>
        </div>
        <div class="share-tips">
          <i class="icon-wechat"></i>
          <span style="font-weight:200">·</span>
          <i class="icon-timeline"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
  .share-mask {
    position: fixed;
    overflow: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1000px;
    background: rgba(255, 255, 255, 0.95);
    color: #777;
    z-index: 1;
  }
  .share-main {
    padding: 1rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .share-icon {
    font-size: 2.5rem;
    text-align: right;
    color: #ff7020;
  }
  .share-label {
    font-size: 1.3rem;
    text-align: center;
    font-weight: 900;
    color: #777;
    padding: 1rem 0;
  }
  .share-tips {
    color: #888;
    font-size: 2rem;
    text-align: center;
    padding: 2rem;
    font-weight: 400;
    margin: 0 4rem;
    border-top: 1px solid #ccc;
  }
</style>

<script lang="babel">
  export default{
    data () {
      return {
        display: false
      }
    },
    created () {
      var self = this
      self.$on('show', () => {
        self.show()
      })
      self.$on('hide', () => {
        self.hide()
      })
    },
    methods: {
      show () {
        this.display = true
      },
      hide () {
        this.display = false
      }
    }
  }
</script>
