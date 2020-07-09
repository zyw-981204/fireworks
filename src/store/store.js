import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new  Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken (state, data) {
      state.token = data
    },
    removeToken (state) {
      state.token = null
    }
    // this.$store.commit('setToken', 'token')

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
      return state.token
    }
  }

})
export default store
