import { MessageBox } from 'element-ui'

export function inputAccount () {
  return MessageBox.alert('请核对账号密码', '错误提醒', {
    confirmButtonText: '确定',
    callback: () => {
      this.$message({
        type: 'info',
        message: `请重新输入账号密码`,
        center: true
      })
    }
  })
}

export function activeCodePrompt () {
  return MessageBox.prompt('请输入激活码', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{5}$/
  })
}

export function loginError () {
  return MessageBox.alert('遇到错误', '提醒', {
    confirmButtonText: '确定'
  })
}


