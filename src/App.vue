<template>
    <div id="app" class="fillContent">
        <head-nav :class="{isHide:isHide}" ref="headNode"></head-nav>
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
        isHide: false
      }
    },
    methods: {
      handleWheel (e) {
        let eventDelta = e.wheelDelta || -e.deltaY * 40
        console.log(eventDelta, this.isHide)
        this.isHide = eventDelta < 0
      },
      test (e) {
        this.isHide = (e.clientY > 60)
        // console.log(this.isHide, e.clientY)
      }
    },
    mounted () {
      window.addEventListener('wheel', this.handleWheel)
      document.addEventListener('mousemove', this.test)
    },
    beforeDestroy () {
      window.removeEventListener('wheel', this.handleWheel)
      window.removeEventListener('mousemove', this.test)
    },
    components: {
      headNav
    }
  }
</script>

<style>
    @import "./assets/css/style.css";
</style>
