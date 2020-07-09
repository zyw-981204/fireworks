<template>
  <div class="headerNav">
    <ul class="navBox">
      <li>
        <router-link to="/user/welcome">我的主页</router-link>
      </li>
      <li>
        <router-link to="/user/register">注册</router-link>
      </li>
      <li>
        <router-link to="/user/login">登录</router-link>
      </li>
      <li>
        <router-link to="/user/photoWall">照片墙</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import login from "@/views/login";
import welcome from "@/views/welcome";
export default {
  name: "headerNav",
  data() {
    return {};
  },
  components: {
    login,
    welcome
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/index.css";
</style>
