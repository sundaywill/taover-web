<template>
  <div class="v-section">
    <div class="v-circle">
      <div class="mask full" :style="rotateStyle">
        <div class="fill" :style="rotateStyle"></div>
      </div>
      <div class="mask half">
        <div class="fill" :style="rotateStyle"></div>
        <div class="fill fix" :style="fixStyle"></div>
      </div>
      <div class="pv">
      <span class="progress" v-if="loading">
        <span>正在扫描</span>
        <span class="detec-item">{{ title || 0 }}</span>
        <span>已完成扫描</span>
        <span class="detec-count">{{ pv || 0 }}项</span>
      </span>
        <span class="progress" v-else>
        <span>已完成扫描</span>
        <span class="detec-count">{{ pv || 0 }}项</span>
        <span class="detec-out">大于一般检测数</span>
      </span>
      </div>
    </div>
    <div class="white h2 pt2">
      <i class="icon-microscope"></i>
      <span class="red">{{ pv || 0 }}</span>项通过检测
    </div>
  </div>
</template>
<script lang="babel">

  const DEFAULT_DETEC_ITEMS = ['铬','砷','镉','铅','汞','黄曲霉毒素B1',"p,p'-DDT","o,p'-DDT",
    'γ-六六六','苄嘧磺隆','丙硫克百威','稻丰散','稻瘟灵','敌瘟磷','丁草胺','多菌灵','甲基毒死蜱',
    '甲基嘧啶磷','甲萘威','喹硫磷','马拉硫磷','杀螟硫磷','溴氰菊酯','四溴菊酯','异丙威','磷化物',
    '吡虫啉','敌敌畏','毒死蜱','甲胺磷','克百威','乐果','噻螨酮','三唑磷','水胺硫磷']

  export default {
    name: "s-circle",
    props: [
      'max',
    ],
    data () {
      return {
        loading: true,
        title: '',
        pv: 0
      }
    },
    mounted () {
      var self = this
      self.$on('$detection:start', () => {
        self.start()
      })
    },
    methods: {
      start() {
        var self = this
        var sec = 0, di = Math.floor(5000 / self.max)
        self.loading = true
        var int = setInterval(function () {
          sec ++
          self.setPv(sec)
          if (sec >= self.max) {
            self.loading = false
            clearInterval(int)
          }
        }, di)
      },
      setPv(sec) {
        var self = this
        var m = DEFAULT_DETEC_ITEMS.length
        var i = ~~(Math.random(0, m) * m)
        self.title = DEFAULT_DETEC_ITEMS[i]
        self.pv = sec
        let types = ['fix', 'rotate']
        types.map((type) => {
          self[type + 'Style'] = {
            transform: this.setTransformStyle(self.pv, type)
          }
        })
      },
      setClip (t, r, b, l) {
        return `rect(${t}px, ${r}px, ${b}px, ${l}px)`
      },
      setTransformStyle (pv, type) {
        let deg = Math.ceil(pv / this.max * 180)
        if (type == 'fix')
          return `rotate(${deg * 2}deg)`
        return `rotate(${deg}deg)`
      },
      setTransitionStyle (t) {
        return `transform ${t}s`
      }
    },
    computed: {
      transformStyleValue () {
        var self = this
        return self.setTransformStyle(self.pv)
      },
      rotateStyle () {
        return {
          transform: this.transformStyleValue,
          webkitTransform: this.transformStyleValue,
          msTransform: this.transformStyleValue,
          oTransform: this.transformStyleValue,
          mozTransform: this.transformStyleValue
        }
      },
      transitionStyle () {
        return {
          transition: this.transitionStyleValue,
          webkitTransition: this.transitionStyleValue,
          mozTransition: this.transitionStyleValue,
          oTransition: this.transitionStyleValue,
          msTransition: this.transitionStyleValue
        }
      },
      fixStyle () {
        return {
          transform: this.fixTransformStyleValue,
          webkitTransform: this.fixTransformStyleValue,
          mozTransform: this.fixTransformStyleValue,
          oTransform: this.fixTransformStyleValue,
          msTransform: this.fixTransformStyleValue
        }
      }
    }
  }
</script>
<style lang="css" scoped>
  .v-section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .v-circle {
    border-radius: 50%;
    position: relative;
    background: #ff9915;
    border: 0;
  }
  .v-circle .mask, .v-circle .fill {
    position: absolute;
    border-radius: 50%;
    backface-visibility: hidden;
  }
  .v-circle, .v-circle .mask, .v-circle .fill {
    width: 15rem;
    height: 15rem;
  }
  .v-circle .mask {
    clip: rect(0, 15rem, 15rem, 7.5rem);
  }
  .v-circle .fill {
    background: #FFEE80;
    clip: rect(0, 7.5rem, 15rem, 0);
  }
  .v-circle .full, .v-circle .mask .fill {
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
  }
  .v-circle .pv {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 1;
    border-radius: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    border: 5px solid #FFAF32;
    background: #FF9915;
    width: 12rem;
    height: 12rem;
  }
  .v-circle .pv .progress {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 1.6rem;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: #ff9915;
  }
  .v-circle .pv .progress .detec-item {
    font-size: 1.2rem;
    color: #FFEE80;
  }
  .v-circle .pv .progress .detec-count {
    font-size: 1.6rem;
    color: #FFEE80;
  }
  .v-circle .pv .progress .detec-out {
    font-size: 1.2rem;
  }
</style>
