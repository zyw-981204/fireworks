import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

import Cookies from 'js-cookie'
//
const login = () => import('../views/login_1')
const welcome = () => import('../views/welcome')
const notFind = () => import('../views/notFound')
const register = () => import('../views/register')
const photoWall = () => import('../views/photoWall')

Vue.use(Router)

// 路由拦截

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/login',
      name: 'login',
      component: login
    },
    {
      path: '/user/register',
      name: 'register',
      component: register
    },
    {
      path: '/user/welcome',
      name: 'welcome',
      meta: {
        requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
      },
      component: welcome
    },
    {
      path: '/user/photoWall',
      name: 'photoWall',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: photoWall
    },
    {
      path: '/admin',
      name: 'admin',
      component: photoWall,
      hidden: true,
      children: [
        {
          path: 'login',
          name: 'admin_login',
          component: login
        },
        {
          path: 'manage',
          name: 'manage',
          component: register,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      path: '*',
      component: notFind
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token || Cookies.get('token')) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/user/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
