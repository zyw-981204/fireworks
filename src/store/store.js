import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: {
      username:'',
      password:'',
      uuid:'',
      token: null
    }
  },
  mutations: {
    setToken (state, data) {
      state.userInfo.token = data
    },
    removeToken (state) {
      state.userInfo.token = null
    },
    // this.$store.commit('setToken', 'userInfo.token')
    setUserInfo(state, param){
      state.userInfo = param;
    }
  },
  actions: {
    // this.$store.dispatch('asyRemoveToken')
    asyRemoveToken (context) {
      setTimeout(() => {
        context.commit('removeToken')
      }, 1000)
    },
    asySetToken (context, payload) {
      setTimeout(() => {
        context.commit('setToken', payload)
      }, 2000)
    }
  },
  getters: {
    token: state => {
      return state.userInfo.token
    }
  }

})
export default store
