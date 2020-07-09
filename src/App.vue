<template>
  <div id="app" class="fillContent">
    <head-nav class="nav"></head-nav>
    <router-view></router-view>
  </div>
</template>


<script>
  import headNav from '@/components/header' // 引入全局组件导航

  export default {
    name: 'App',
    data () {
      return {
        isShow: this.$store.state.show,
      }
    },
    methods: {
      change () {
        this.isShow = !this.isShow
        this.$store.getters.token()
      },
      windowScroll () {
        // 滚动条距离页面顶部的距离
        // 以下写法原生兼容
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
      }
    },
    mounted () {
      window.addEventListener('scroll', this.windowScroll)
      var navNode = document.querySelector('.nav')

      function bind (obj, eventStr, callback) {
        if (obj.addEventListener) {
          obj.addEventListener(eventStr, callback, false)
        } else {
          obj.attachEvent('on' + eventStr, function () {
            callback.call(obj)
          })
        }
      }

      document.onmousewheel = function (event) {
        event = event || window.event
        if (event.wheelDelta > 0 || event.detail < 0) {
          navNode.style.top = '0px'
        } else {
          navNode.style.top = '-60px'
        }
      }
      bind(document, 'DOMMouseScroll', document.onmousewheel)
    },
    components: {
      headNav
    }
  }
</script>

<style>
  @import "./assets/css/style.css";
</style>
