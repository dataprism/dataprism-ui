import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    request: {
      language: 'javascript',
      instanceCount: 1,
      name: 'a_testing_script',
      payload: null,
      pending: false
    }
  },
  mutations: {
    code (state, blob) {
      state.request.payload = blob
    },
    send (state) {
      state.request.pending = true
    },
    receive (state) {
      console.log('receive')
      state.request.pending = false
    }
  }
})
