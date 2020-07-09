import axios from 'axios'
import store from '../store/store'
import { Notification, MessageBox, Message } from 'element-ui'
import { getToken } from './handleToken' //获取token
import errorCode from './errorCode' //错误码
// 设置数据类型 和编码格式
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 封装axios 请求
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API === 'development' ? '' : '',
  // 判断是否是开发环境 如果是开发环境则加前者 不是则加后者
  timeout: 6000,
  // 设置超时
  headers: { /*解决ie自动缓存*/
    'cache-control': 'no-cache',
    'Pragma': 'no-cache'
  }
})

// http request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    if (store.state.token || getToken()) {
      // 如果vuex中存在token 或者cookie中存在token
      config.headers['admin-token'] = getToken() // 从cookie中获取token
      // 让每个请求的请求携带自定义的token
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  })

// http  response 拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const message = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$store.dispatch('asyRemoveToken').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 500) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    } else if (code !== 200) {
      Notification.error({
        title: message
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service

