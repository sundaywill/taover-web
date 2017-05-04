<template>
  <div class="v-circle" :style="circleStyle">
    <div class="mask full" :style="[maskStyle, transitionStyle, rotateStyle]">
      <div class="fill" :style="[fillStyle, transitionStyle, rotateStyle]"></div>
    </div>
    <div class="mask half" :style="[maskStyle]">
      <div class="fill" :style="[fillStyle, transitionStyle, rotateStyle]"></div>
      <div class="fill fix" :style="[fillStyle, fixStyle, transitionStyle]"></div>
    </div>
    <div class="pv" :style="pvStyle">
      <div class="progress">{{ pv || 0 }}%</div>
    </div>
  </div>
</template>
<script lang="babel">
  const DEFAULT_WIDTH = 150,
    DEFAULT_BOLD = 5,
    DEFAULT_COLOR = '#777',
    DEFAULT_FILL_COLOR = '#ff8a00',
    DEFAULT_BORDER_COLOR = '#eee'
  export default {
    name: "p-circle",
    props: [
      'fillColor',
      'borderColor',
      'color',
      'width',
      'bold',
      'pv'
    ],
    methods: {
      setClip (t, r, b, l) {
        return `rect(${t}px, ${r}px, ${b}px, ${l}px)`
      },
      setTransformStyle (pv, type) {
        let deg = Math.floor(pv / 100 * 180)
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
        return this.setTransformStyle(this.pv)
      },
      innerCircleWidth () {
        return (this.width || DEFAULT_WIDTH) - (2 * (this.bold || DEFAULT_BOLD)) + 'px'
      },
      fixTransformStyleValue () {
        return this.setTransformStyle(this.pv, 'fix')
      },
      transitionStyleValue () {
        return this.setTransitionStyle(0.8)
      },
      circleStyle () {
        return {
          backgroundColor: this.borderColor || DEFAULT_BORDER_COLOR,
          width: (this.width || DEFAULT_WIDTH) + 'px',
          height: (this.width || DEFAULT_WIDTH) + 'px'
        }
      },
      fillStyle () {
        return {
          backgroundColor: this.fillColor || DEFAULT_FILL_COLOR,
          width: (this.width || DEFAULT_WIDTH) + 'px',
          height: (this.width || DEFAULT_WIDTH) + 'px',
          clip: this.setClip(0, this.width / 2, this.width, 0)
        }
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
      maskStyle () {
        return {
          width: (this.width || DEFAULT_WIDTH) + 'px',
          height: (this.width || DEFAULT_WIDTH) + 'px',
          clip: this.setClip(0, this.width, this.width, this.width / 2)
        }
      },
      pvStyle () {
        return {
          color: this.color || DEFAULT_COLOR,
          width: this.innerCircleWidth,
          height: (this.width || DEFAULT_WIDTH) - (2 * (this.bold || DEFAULT_BOLD)) + 'px'
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
  .v-circle {
    border-radius: 50%;
    position: relative;
    background: #ddd;
    border: 0;
  }
  .v-circle .mask,
  .v-circle .fill {
    position: absolute;
    border-radius: 50%;
    backface-visibility: hidden;
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
    border: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .v-circle .progress {
    margin: 0;
    padding: 0;
    background: transparent;
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
    font-weight: bold;
    font-size: 1.6rem;
  }
  .v-circle .pv .progress > div {
    width: 100%;
    height: 100%;
    line-height: 1rem;
  }
</style>
