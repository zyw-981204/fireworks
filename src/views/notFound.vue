<template>
  <div class="NotFind">
    <div class="notFound-box"> 
        <div class="notFound_tips">
       <div>
         对不起你输入的网址未找到你可以选择
       </div>
          <ul>
            <li><router-link  to="/">返回首页</router-link></li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/index.css";
</style>
