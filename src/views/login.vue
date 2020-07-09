<template>
  <div class="content">
    <router-view></router-view>
    <div class="loading-layer">
      <div class="load_box">
        <div class="top-img-wrapper">
          <img src="../assets/img/user_pic.jpg"/>
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
          <button class="el-but" @click="gotoReg">注册</button>
          <button class="el-but" @click="handleLogin('loginFromNode')">登录</button>
          <el-checkbox v-model="loginFrom.isRemember" id="remember">记住密码
          </el-checkbox>
          <span @click="test">还没有账号？</span>
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
    </div>
  </div>
</template>

<script>
  import { login, sentValidateCode } from '../api/login.js'
  import { encrypt, decrypt } from '../utils/jsencrypt'
  import Cookies from 'js-cookie'

  export default {
    name: 'login',
    data () {
      return {
        rules: {
          username: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
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
            {required: true, message: '请输入密码', trigger: 'blur'},
            {
              required: true,
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
              message: '密码应该是包含 数字和英文，长度6-20',
              trigger: 'blur'
            }
          ]
        },
        loginFrom: {
          username: 'admin',
          password: 'zyw123123',
          code: '',
          uuid: '',
          isRemember: false
        },
        validateCode: {validateCode: ''}
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
      gotoReg () {
        // 跳转注册
        this.$router.push('/user/register')
      },
      handleLogin () {
        // 登录提交
        this.$refs.loginFromNode.validate((valid) => {
          if (valid) {
            console.log(decrypt(Cookies.set('password', '123456')))
            // Cookies.set('username', this.loginFrom.username, { expire: 15 })
            // 是否记住密码 如果记住就把账号密码是否记住密码存到cookies中
            if (this.loginFrom.isRemember) {
              Cookies.set('username', this.loginFrom.username, {expires: 15})
              Cookies.set('password', encrypt(this.loginFrom.password)/*  把编码的密码存进cookie */, {expires: 15})
              Cookies.set('isRemember', this.loginFrom.isRemember, {expires: 15})
              // 把账号密码是否记住密码存到cookie中 15天后过期
            } else {
              Cookies.remove('username')
              Cookies.remove('password')
              Cookies.remove('isRemember')
              // 选择不记住密码 直接把cookie中的数据删除
            }
            login(this.loginFrom)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$router.push('/welcome')
                } else if (res.data.message == '账号未激活') {
                  this.$alert('请前往你预留的邮箱获取激活码')
                  this.enterValidateCode()
                }
              })
          } else {
            this.$alert('请核对账号密码', '错误提醒', {
              confirmButtonText: '确定',
              callback: () => {
                this.$message({
                  type: 'info',
                  message: `请重新输入账号密码`
                })
              }
            })
            return false
          }
        })
      },
      enterValidateCode () {
        // 输入激活码
        this.$prompt('请输入激活码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{5}$/
        })
          .then((value) => {
            // value为上面prompt输入的5位激活码
            this.validateCode.validateCode = value
            sentValidateCode(this.validateCode)
              .then(res => {
                if ((res.data.code = 200)) {
                  this.$router.push('/welcome')
                } else if ((res.data.data = '激活码错误')) {
                  this.$message('请输入正确的激活码')
                }
              })
              .catch((err) => {
                this.$message('遇到未知错误')
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      },
      test () {
        Cookies.set('123', '12345678', {expires: 15})
        Cookies.set('qwe', 'zw666zyw666', {expires: 15})
        Cookies.set('des', '123zc', {expires: 15})
        console.log(Cookies.get())
      }
    }
  }
</script>

<style>
  @import "../assets/css/index.css";
</style>
