import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentToken: localStorage.getItem("user-token"),
    currentKey: localStorage.getItem("key")
  },
  mutations: {
    setLoginStatus(state, payload) {
      state.isLogin = payload;
    },
    setCurrentToken(state, token) {
      localStorage.setItem("user-token", token);
      state.currentToken = token;
    },
    setCurrentKey(state, key) {
      localStorage.setItem("key", key);
      state.currentKey = key;
    }
  },
  getters: {
    getLoggedStatus(state) {
      return state.isLogin;
    },
    getCurrentToken(state) {
      return state.currentToken;
    },
    getCurrentKey(state) {
      return state.currentKey;
    }
  },
  actions: {
  },
  modules: {
  }
})
