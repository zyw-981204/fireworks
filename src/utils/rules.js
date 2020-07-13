let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
// 定义了一个正则 判断两次密码不能相同
let validateConfirmPwd = (rule, value, callback) => {// eslint-disable-line no-unused-vars
  if (!reg.test(value)) {
    callback(new Error('密码应是8-20位数字、字母或字符！'))
  } else if (this.ruleFormData.password !== value) {
    callback(new Error('两次密码输入不一致！'))
  } else {
    callback()
  }
}
const rules = {
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
  password: [
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
  email: [
    { type: 'email', message: '请填写正确的邮箱', trigger: 'blur' },
    { required: true, message: '请输入邮箱', trigger: 'blur' }
  ]
}
export default rules