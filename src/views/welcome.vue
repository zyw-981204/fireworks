<template>
    <div @wheel="scrollToTop" class="welcome">
        <img ref='imgNode' src="../assets/img/welcome.jpg" class="allView" v-show='inStillShow'>
    </div>
</template>

<script>

  export default {
    name: 'loading',
    data () {
      return {
        inStillShow: true,
        scrollValue: 1,
        imageHeight: '',
        isUp: true,
        count: 0,
        firstIn: true
      }
    },
    methods: {
      scrollToTop (event) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        console.log(`firstIn:${this.firstIn}, this.inStillShow:${this.inStillShow}, scrollTop:${scrollTop}, this.isUp:${this.isUp}, this.count:${this.count}`)
        if (this.isUp === true && scrollTop === 0) {
          this.count++
        }
        // if(this.inStillShow === false && )
        if ((scrollTop > (this.imageHeight + 50)) && this.firstIn === true) {
          this.inStillShow = false
          this.firstIn = false
          window.scrollTo(0, 0)
        }
        if ((scrollTop > (this.imageHeight + 50)) && this.firstIn === false && this.inStillShow === false) {
          this.inStillShow = false
          this.count = 0
          // window.scrollTo(0, 0)
        }
        if (scrollTop === 0 && this.count >= 10) { // 判断
          window.scrollTo(0, this.imageHeight)
          this.inStillShow = true
          this.firstIn = false
          this.count = -9999
        }

      },
      judgeIsUp (e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        this.isUp = (eventDelta > 0)
      }
    },
    mounted () {
      this.$refs.imgNode.style.height = screen.availHeight + 'px'
      console.log(screen.availHeight, this.$refs.imgNode.style.height)
      this.imageHeight = this.$refs.imgNode.offsetHeight
      window.addEventListener('scroll', this.scrollToTop)
      window, addEventListener('wheel', this.judgeIsUp)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
      window, removeEventListener('wheel', this.judgeIsUp)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
