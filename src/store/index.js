import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  code: {
    language: 'javascript',
    blob: null
  },
  mutations: {
    code (state, blob) {
      state.blob = blob
    }
  }
})
