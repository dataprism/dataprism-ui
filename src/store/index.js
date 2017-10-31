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
        id: 'one',
        name: 'logic1',
        lang: 'JavaScript',
        status: 'ok',
        code: '# dataprism-kfunc-ui\r\n\r\n> A Vue frontend application used for editing generating Kafka Streams code snippets.\r\n\r\n## Build Setup\r\n\r\n``` bash\r\n# install dependencies\r\nnpm install\r\n\r\n# serve with hot reload at localhost:8080\r\nnpm run dev\r\n\r\n# build for production with minification\r\nnpm run build\r\n\r\n# build for production and view the bundle analyzer report\r\nnpm run build --report\r\n\r\n# run unit tests\r\nnpm run unit\r\n\r\n# run all tests\r\nnpm test\r\n```\r\n\r\nFor a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).',
        version: 1
      },
      {
        id: 'two',
        name: 'logic2',
        lang: 'JavaScript',
        status: 'error',
        code: '# dataprism-kfunc-ui\r\n\r\n> A Vue frontend application used for editing generating Kafka Streams code snippets.\r\n\r\n## Build Setup\r\n\r\n``` bash\r\n# install dependencies\r\nnpm install\r\n\r\n# serve with hot reload at localhost:8080\r\nnpm run dev\r\n\r\n# build for production with minification\r\nnpm run build\r\n\r\n# build for production and view the bundle analyzer report\r\nnpm run build --report\r\n\r\n# run unit tests\r\nnpm run unit\r\n\r\n# run all tests\r\nnpm test\r\n```\r\n\r\nFor a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).',
        version: 2
      },
      {
        if: 'three',
        name: 'logic3',
        lang: 'JavaScript',
        status: 'ok',
        code: '# dataprism-kfunc-ui\r\n\r\n> A Vue frontend application used for editing generating Kafka Streams code snippets.\r\n\r\n## Build Setup\r\n\r\n``` bash\r\n# install dependencies\r\nnpm install\r\n\r\n# serve with hot reload at localhost:8080\r\nnpm run dev\r\n\r\n# build for production with minification\r\nnpm run build\r\n\r\n# build for production and view the bundle analyzer report\r\nnpm run build --report\r\n\r\n# run unit tests\r\nnpm run unit\r\n\r\n# run all tests\r\nnpm test\r\n```\r\n\r\nFor a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).',
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
