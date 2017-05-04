<template>
  <div class="col col-12 border-box py2 bg-silver silver">
    <div class="p1 col-12 center">
      <span>微信客服公众号：</span>
      <a class="orange">梅子淘源商城（taoyuanlife）</a>
    </div>
    <div class="p1 col-12 center">
      <span>客服电话：</span>
      <a class="orange" href="tel:400-9609517">400-9609517</a>
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    methods: {
      hideQrCode () {
        var self = this
        var e = e || window.event // 浏览器兼容性
        console.log(e)
        var elem = e.target || e.srcElement
        while (elem) {
          if (elem.rel && elem.rel == 'modal-btn') return
          // 循环判断至跟节点，防止点击的是子元素
          if (elem.className && elem.className == 'modal-wrapper') return
          elem = elem.parentNode
        }
        self.show = false
      }
    }
  }
</script>
