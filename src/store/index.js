import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    request: {
      language: 'javascript',
      instanceCount: 1,
      name: 'a_testing_script',
      payload: null
    }
  },
  mutations: {
    code (state, blob) {
      state.request.payload = blob
    }
  }
})
