<template>
  <div class="content overfolw">
    <div class="register-layer">
      <span>欢迎注册</span>
      <span>Fireworks账号</span>
      <div class="regist-from">
        <el-form
          ref="ruleForm"
          label-position="right"
          :rules="rules"
          label-width="120px"
          :model="ruleFormData"
          class="from_color"
        >
          <el-form-item label="请输入昵称" class="input-400" prop="name">
            <el-input placeholder="请输入昵称" name="name " v-model="ruleFormData.username"></el-input>
          </el-form-item>
          <el-form-item label="请选择性别" style="width:480px;height:40px;" prop="sex">
            <label for="man" class="radio">
              <span class="radio-bg"></span>
              <input type="radio" name="sex" id="man" value="0" v-model="ruleFormData.sex"/> 男
              <span class="radio-on"></span>
            </label>
            <label for="woman" class="radio">
              <span class="radio-bg"></span>
              <input type="radio" name="sex" id="woman" value="1" v-model="ruleFormData.sex"/> 女
              <span class="radio-on"></span>
            </label>
          </el-form-item>
          <el-form-item label="请输入手机号" class="input-400" prop="phone">
            <el-input placeholder="请输入手机号" name="phone " v-model="ruleFormData.phone"></el-input>
          </el-form-item>
          <el-form-item label="请输入邮箱" class="input-400" prop="eMail">
            <el-input placeholder="请输入邮箱" name="eMail " v-model="ruleFormData.eMail"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" class="input-400" prop="oldPassword">
            <el-input
              placeholder="请输入密码"
              type="password"
              name="oldPassword "
              v-model="ruleFormData.oldPassword"
            ></el-input>
          </el-form-item>
          <el-form-item label="再次确定密码" class="input-400" prop="newPassword">
            <el-input
              type="password"
              placeholder="请再次确认密码"
              v-model="ruleFormData.newPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="请选择生日" prop="birthday" class="input-400">
            <el-date-picker
              name="birthday"
              type="date"
              v-model="ruleFormData.birthday"
              placeholder="选择生日"
              text-align="right"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="请输入验证码" class="input-400" prop="verifyCode">
            <el-input placeholder="请输入验证码" name="verifyCode " v-model="ruleFormData.verifyCode"></el-input>
          </el-form-item>
        </el-form>
        <div class="validateCode">
          <div>验证码</div>
          <img :src="verifyCodeUrl" @click="reGetVerifyCodeUrl"/>
        </div>

        <div class="reg-reset-box">
          <button class="reg-reset" @click="resetForm('ruleForm')">重置信息</button>
          <button class="reg-reset" @click="register_submit('ruleForm')">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { submitRegisterFrom, getVerifyCode } from '../api/register.js'
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  // 定义了一个正则
  let validateConfirmPwd = (rule, value, callback) => {
    if (!reg.test(value)) {
      callback(new Error('密码应是8-20位数字、字母或字符！'))
    } else if (this.ruleFormData.oldPassword !== value) {
      callback(new Error('两次密码输入不一致！'))
    } else {
      callback()
    }
  }
  export default {
    name: 'register',
    data () {
      return {
        verifyCodeUrl: '',
        ruleFormData: {
          username: '',
          oldPassword: '',
          newPassword: '',
          birthday: '',
          eMail: '',
          phone: '',
          sex: '',
          verifyCode: ''
        },
        message: '',
        rules: {
          verifyCode: [
            {
              required: true,
              pattern: /^[0-9a-zA-Z]{4}$/,
              message: '请输入验证码',
              trigger: 'blur'
            }
          ],
          username: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 3 到 10 个字符', trigger: 'blur' },
            {
              required: true,
              pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
              message: '姓名不支持特殊字符',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              pattern: /^1[34578]\d{9}$/,
              message: '请输入正确的手机号',
              trigger: 'blur'
            }
          ],
          sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
          oldPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              required: true,
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
              message: '密码要求是包含 数字和英文，长度6-20',
              trigger: 'blur'
            }
          ],
          newPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              required: true,
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
              message: ' 密码要求包含 数字和英文，长度6-20',
              trigger: 'blur'
            },
            {
              validator: validateConfirmPwd,
              trigger: 'blur'
            }
          ],
          birthday: [
            {
              type: 'date',
              required: true,
              message: '请填写正确的日期',
              trigger: 'change'
            }
          ],
          eMail: [
            { type: 'email', message: '请填写正确的邮箱', trigger: 'blur' },
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }, // 重置表单
      register_submit (formName) {
        //提交表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitRegisterFrom(this.ruleFormData)
              .then(res => {
                if (res.data.code === 200) {
                  this.$router.push('/login')
                } else if (res.data.message === '验证码错误') {
                  this.getVerifyCode()
                }
              })
              .catch(err => {
                alert(`遇到${err.description} 错误代码为${err.code}`)
                this.getVerifyCode()
              })
          } else {
            alert('请核对信息是否输入完成')
            return false
          }
        })
      } ,
      reGetVerifyCodeUrl(){
        getVerifyCode();
      }
    },
    mounted () {
      getVerifyCode();
    }
  }
</script>
<style>
  @import "../assets/css/index.css";
</style>
