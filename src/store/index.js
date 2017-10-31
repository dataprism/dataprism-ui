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
    },
    logics: [
      {
        name: 'logic1',
        lang: 'JavaScript',
        status: 'ok',
        code: '// == code goes here == //',
        version: 1
      },
      {
        name: 'logic2',
        lang: 'JavaScript',
        status: 'error',
        code: '// == code goes here == //',
        version: 2
      },
      {
        name: 'logic3',
        lang: 'JavaScript',
        status: 'ok',
        code: '// == code goes here == //',
        version: 11
      }
    ]
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
