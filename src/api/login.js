import service from '../utils/require'
import base from './base'

export const login = data => {
// 提交账号密码
  return service({
    method: 'post',
    url: `${base.user}/login`,
    data
  })
}

export const sentValidateCode = () =>{
  return service({
    method:"post",
    url:`${base.user}/active`
  })
}
