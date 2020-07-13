<template>
    <div class="content" :class={bg:isBg}>
        <div class="loading-layer">
            <div class="load_box" v-show='isShow'>
                <div class="top-img-wrapper">
                    <img src="../assets/img/user_pic.jpg"
                         :class=[{playState:isPause},{loading:isLoading}]
                         class="pic "
                         @click="toggleStates">
                </div>
                <el-form ref="loginFromNode" class="use_pass_list" :model="loginFrom" :rules="rules">
                    <el-form-item prop="username">
                        <el-input
                                type="text"
                                name="username"
                                placeholder="请输入用户名"
                                v-model="loginFrom.username"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                type="password"
                                name="password"
                                placeholder="请输入密码"
                                v-model="loginFrom.password"
                        />
                    </el-form-item>
                </el-form>
                <div class="button_box">
                    <button class="el-but" @click="goToRoute('/user/register')">注册</button>
                    <button class="el-but" @click="handleLogin('loginFromNode')">登录</button>
                    <el-checkbox v-model="loginFrom.isRemember" id="remember">记住密码
                    </el-checkbox>
                    <span @click="goToRoute('/user/register')">还没有账号？</span>
                </div>
                <ul class="load-bottom-wrapper clearfix">
                    <li>
                        <a href>意见反馈</a>
                    </li>
                    <li>|</li>
                    <li>
                        <a href="##">忘记密码</a>
                    </li>
                </ul>
            </div>
            <div v-show="!isShow" class="as">
                <img src="../assets/img/user_pic.jpg"
                     :class=[{playState:isPause},{loading:isLoading}]
                     class="pic"
                     @click="isLoading = false">
                <div class="loadingTips">登陆中· · ·</div>
                <div class="loadingTips" style="padding-top:20px;">点击头像可以取消登录</div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>


  import rules from '../utils/rules'
  import store from '../store/store'

  import Cookies from 'js-cookie'

  import { login, sentValidateCode } from '../api/login.js'
  import { encrypt, decrypt } from '../utils/jsencrypt'
  import { inputAccount, activeCodePrompt } from '../utils/loginMessage'

  export default {
    name: 'login',
    data () {
      return {
        rules: rules,
        loginFrom: { //用户信息表单
          username: 'admin',
          password: 'zyw123123',
          code: '',
          uuid: '',
          isRemember: false
        },// 用户信息表单
        validateCode: { validateCode: '' },// 激活码
        isPause: false, // 头像是否旋转
        isLoading: false,// 是否在登录中
        isBg: false, // 阴影是否出来
        isShow: true // 登录框是否显示
      }
    },
    created () {
      this.getCookie()
    },
    methods: {
      getCookie () {
        const username = Cookies.get('username')
        const password = Cookies.get('password')
        const isRemember = Cookies.get('isRemember')
        this.loginFrom = {
          username: username === undefined ? this.loginFrom.username : username,
          password: password === undefined ? this.loginFrom.password : decrypt(password),
          isRemember: isRemember === undefined ? false : Boolean(isRemember)
        }
      },
      setUserInfo (param) {
        //把userInfo 传到Vuex中 并且存到cookie中
        store.commit('setUserInfo', param)
      },
      setCookie () {
        Cookies.set('username', this.loginFrom.username)
        Cookies.set('password', this.loginFrom.password)
        Cookies.set('isRemember', this.loginFrom.isRemember)
        Cookies.set('token', this.loginFrom.token)
        Cookies.set('uuid', this.loginFrom.uuid)
      },
      removeCookies () {
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('isRemember')
        Cookies.remove('token')
        Cookies.remove('uuid')
      },
      goToRoute (url) { // 跳转注册
        this.$router.push(url)
      },
      handleLogin () {
        // 登录提交
        this.$refs.loginFromNode.validate((valid) => {
          if (valid) {
            if (this.loginFrom.isRemember) {
              Cookies.set('username', this.loginFrom.username, { expires: 15 })
              Cookies.set('password', encrypt(this.loginFrom.password)/*  把编码的密码存进cookie */, { expires: 15 })
              Cookies.set('isRemember', this.loginFrom.isRemember, { expires: 15 })
              // 把账号密码是否记住密码存到cookie中 15天后过期
            } else {
              this.removeCookies()
              // 选择不记住密码 直接把cookie中的数据删除
            }
            // Cookies.set('username', this.loginFrom.username, { expire: 15 })
            // 是否记住密码 如果记住就把账号密码是否记住密码存到cookies中
            // 显示登陆中
            this.isLoading = true
            login(this.loginFrom)
              .then((res) => {
                if (res.code === 200) {
                  this.loginFrom.uuid = res.data.uuid
                  this.loginFrom.token = res.data.token
                  this.setUserInfo()
                  // 把用户信息存到 Vuex中
                  this.setCookie()
                  // 把用户信息存到 cookies中
                  this.goToRoute('/welcome')
                } else if (res.msg === '用户未激活') {
                  this.isLoading = false
                  this.$alert('请前往你预留的邮箱获取激活码')
                  this.enterValidateCode()
                } else {
                  this.isLoading = false
                  this.$alert(`遇到错误代码为${res.code} 错误为${res.msg}`)
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: `登陆失败,请检查网络连接 稍后重新登陆`,
                  center: true
                })
                setTimeout(() => {
                  this.isLoading = false
                }, 2000)
              })
          } else {
            inputAccount()
            // 显示核对账号密码
            return false
          }
        })
      },
      enterValidateCode () {
        // 输入激活码
        activeCodePrompt()
          // 显示请输入激活码
          .then((value) => {
            // value为上面prompt输入的5位激活码
            this.validateCode.validateCode = value
            sentValidateCode(this.validateCode)
              // 发送激活码后的then
              .then(res => {
                if ((res.code === 200)) {
                  this.$router.push('/welcome')
                } else {
                  this.$message('请检查输入的激活码是否正确')
                }
              })
              // 发送激活码没有响应
              .catch(() => {
                this.$message('出现网络问题，请检查网络连接')
              })
          })
          // 输入是否成功 如果失败则进入catch
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      },
      // 头像暂停旋转切换
      toggleStates () {
        this.isPause = !this.isPause
      },
      // 切换登录动画
      loginAnimationToggle () {
        this.isBg = !this.isBg
        this.isLoading = !this.isLoading
        this.isShow = !this.isShow
      }
    },
    watch: {
      isLoading: function () {
        if (this.isLoading === true) {
          this.isBg = true
          this.isShow = false
        } else {
          this.isBg = false
          this.isShow = true
        }
      }

    }
  }
</script>

<style>
    @import "../assets/css/index.css";
</style>
m