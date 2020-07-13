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
                    <el-form-item label="请输入邮箱" class="input-400" prop="email">
                        <el-input placeholder="请输入邮箱" name="email " v-model="ruleFormData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入密码" class="input-400" prop="password">
                        <el-input
                                placeholder="请输入密码"
                                type="password"
                                name="password "
                                v-model="ruleFormData.password"
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
                        <el-input placeholder="请输入验证码" name="verifyCode " v-model="ruleFormData.code"></el-input>
                    </el-form-item>
                </el-form>
                <div class="validateCode">
                    <div>验证码</div>
                    <img :src="verifyCodeImg" alt="验证码" @click="getVerifyCodeImg"/>
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
  import rules from '../utils/rules'
  import { submitRegisterFrom, getVerifyCode } from '../api/register.js'

  export default {
    name: 'register',
    data () {
      return {
        verifyCodeBase64: '',
        ruleFormData: {
          username: '',
          password: '',
          newPassword: '',
          birthday: '',
          email: '',
          phone: '',
          sex: '',
          code: '',
          uuid: ''
        },
        message: '',
        rules: rules
      }
    },
    methods: {
      // 重置表单
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      //提交表单
      register_submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitRegisterFrom(this.ruleFormData)
              .then(res => {
                if (res.code === 200) {
                  this.$router.push('/login')
                } else {
                  this.getVerifyCodeImg()
                }
              })
              .catch((err) => {
                this.$alert(`遇到${err.msg} 错误代码为${err.code}`)
                this.getVerifyCodeImg()
              })
          } else {
            this.$alert('请核对信息是否输入完成')
            return false
          }
        })
      },
      getVerifyCodeImg () {
        // this.verifyCodeSwitch()
        getVerifyCode().then((res) => {
          this.ruleFormData.uuid = res.uuid
          this.verifyCodeBase64 = res.img
        })
          .catch((err) => {
            this.$message('因网络问题，验证码获取失败，请稍后重试')
            console.log(err)
          })
      }
    },
    computed: {
        verifyCodeImg: function () {
          return `data:image/jpeg;base64,${this.verifyCodeBase64}`
      }
    },
    mounted () {
      this.getVerifyCodeImg()
    }
  }
</script>
<style>
    @import "../assets/css/index.css";
</style>
