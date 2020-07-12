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
                     @click="cancelLogin">
                <div class="loadingTips">登陆中· · ·</div>
                <div class="loadingTips" style="padding-top:20px;">点击头像可以取消登录</div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
  import { login, sentValidateCode } from '../api/login.js'
  import { encrypt, decrypt } from '../utils/jsencrypt'
  import Cookies from 'js-cookie'
  import store from '../store/store'
  import { inputAccount, activeCodePrompt } from '../utils/loginMessage'

  export default {
    name: 'login',
    data () {
      return {
        rules: {
          username: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            {
              min: 1,
              max: 20,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            },
            {
              required: true,
              pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
              message: '请输入正确的账号/昵称',
              trigger: 'blur'
            }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              required: true,
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
              message: '密码应该是包含 数字和英文，长度6-20',
              trigger: 'blur'
            }
          ]
        },
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
        isShow: true, // 登录框是否显示
        isCancel: false // 登录是否被取消
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
            this.isCancel = false
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
            this.loginAnimationToggle()
            login(this.loginFrom)
              .then((res) => {
                if (res.data.code == 200) {
                  this.loginFrom.uuid = res.data.uuid
                  this.loginFrom.token = res.data.token
                  this.setUserInfo()
                  // 把用户信息存到 Vuex中
                  this.setCookie()
                  console.log(this.loginFrom.uuid, this.loginFrom.token)
                  // 把用户信息存到 cookies中
                  this.goToRoute('/welcome')
                } else if (res.msg === '用户未激活') {
                  this.enterValidateCode()
                  // this.$alert('请前往你预留的邮箱获取激活码')
                } else {
                  this.loginAnimationToggle()
                }
              })
              .catch((err) => {
                this.$message({
                  type: 'info',
                  message: `请重新输入账号密码`,
                  center: true
                })
                this.cancelLogin()
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
              .then(res => {
                if ((res.code = 200)) {
                  this.$router.push('/welcome')
                } else if ((res.msg = '激活码错误')) {
                  this.$message('请输入正确的激活码')
                }
              })
              .catch(() => {
                this.$message('遇到未知错误')
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      }
      ,
      // 头像暂停旋转切换
      toggleStates () {
        this.isPause = !this.isPause
      },
      // 切换登录动画
      loginAnimationToggle () {
        this.isBg = !this.isBg
        this.isLoading = !this.isLoading
        this.isShow = !this.isShow
        if (this.isCancel === true) {
          this.isBg = false
          this.isLoading = false
          this.isShow = true
        } else {
          this.isBg = true
          this.isLoading = true
          this.isShow = false
        }
      },
      cancelLogin () {
        this.isCancel = true
        this.loginAnimationToggle()
      }
    },
    mounted () {
      activeCodePrompt()
      this.$message('遇到未知错误')
    }
  }
</script>

<style>
    @import "../assets/css/index.css";
</style>
