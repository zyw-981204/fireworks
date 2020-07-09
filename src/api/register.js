import service from '../utils/require'

export const submitRegisterFrom = data => {
// 提交注册表单
  return service({
    method: 'post',
    url: '/register',
    data
  })
}
export const getVerifyCode = () => {
  // 获取验证码
  let timestamp = Date.parse(new Date())
  return service({
    method: 'get',
    url: `/verifyCode?time=${timestamp}`
  })
}


