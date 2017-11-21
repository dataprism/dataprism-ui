import Vuex from 'vuex'
import Vue from 'vue'

import Logics from './modules/logics/logics'
import Links from './modules/sync/links'
import Notifications from './modules/notifications'
import Api from './modules/api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    logics: Logics,
    links: Links,
    notifications: Notifications,
    api: Api
  }
  // state: {
  //   request: {
  //   //   id: 'hello_world',
  //   //   language: 'javascript',
  //   //   instanceCount: 1,
  //   //   name: 'a_testing_script',
  //   //   payload: null,
  //     pending: false
  //   },
  //   logics: {
  //     1: {
  //       id: '1',
  //       name: 'Normalize events',
  //       lang: 'JavaScript',
  //       status: 'ok',
  //       description: '# dataprism-kfunc-ui\r\n\r\n> A Vue frontend application used for editing generating Kafka Streams code snippets.\r\n\r\n## Build Setup\r\n\r\n``` bash\r\n# install dependencies\r\nnpm install\r\n\r\n# serve with hot reload at localhost:8080\r\nnpm run dev\r\n\r\n# build for production with minification\r\nnpm run build\r\n\r\n# build for production and view the bundle analyzer report\r\nnpm run build --report\r\n\r\n# run unit tests\r\nnpm run unit\r\n\r\n# run all tests\r\nnpm test\r\n```\r\n\r\nFor a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).',
  //       version: 1,
  //       code: 'mutations: {\r\n    code (state, blob) {\r\n      state.request.payload = blob\r\n    },\r\n    send (state) {\r\n      state.request.pending = true\r\n    },\r\n    receive (state) {\r\n      console.log(\'receive\')\r\n      state.request.pending = false\r\n    }\r\n  }',
  //       persisted: true,
  //       properties: [
  //         {color: 'primary', content: '203 events/s'},
  //         {color: 'primary', content: 'v2'}
  //       ]
  //     },
  //     2: {
  //       id: '2',
  //       name: 'Enrich metadata',
  //       lang: 'JavaScript',
  //       status: 'error',
  //       description: '# dataprism-kfunc-ui\r\n\r\n> A Vue frontend application used for editing generating Kafka Streams code snippets.\r\n\r\n## Build Setup\r\n\r\n``` bash\r\n# install dependencies\r\nnpm install\r\n\r\n# serve with hot reload at localhost:8080\r\nnpm run dev\r\n\r\n# build for production with minification\r\nnpm run build\r\n\r\n# build for production and view the bundle analyzer report\r\nnpm run build --report\r\n\r\n# run unit tests\r\nnpm run unit\r\n\r\n# run all tests\r\nnpm test\r\n```\r\n\r\nFor a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).',
  //       version: 2,
  //       code: 'export default {\r\n    components: {\r\n      \'vue-markdown\': VueMarkdown\r\n    },\r\n    name: \'logic\',\r\n    props: [\'name\', \'lang\', \'status\', \'version\', \'code\', \'id\'],\r\n    data () {\r\n      return {\r\n        show: false\r\n      }\r\n    },\r\n    methods: {\r\n      onToggleExpand () {\r\n        this.show = !this.show\r\n      },\r\n\r\n      onEdit (logicId) {\r\n        this.$emit(\'edit\', logicId)\r\n      }\r\n\r\n    }\r\n  }',
  //       persisted: true
  //     },
  //     3: {
  //       id: '3',
  //       name: 'Group by region',
  //       lang: 'JavaScript',
  //       status: 'ok',
  //       description: '# dataprism-kfunc-ui\r\n\r\n> A Vue frontend application used for editing generating Kafka Streams code snippets.\r\n\r\n## Build Setup\r\n\r\n``` bash\r\n# install dependencies\r\nnpm install\r\n\r\n# serve with hot reload at localhost:8080\r\nnpm run dev\r\n\r\n# build for production with minification\r\nnpm run build\r\n\r\n# build for production and view the bundle analyzer report\r\nnpm run build --report\r\n\r\n# run unit tests\r\nnpm run unit\r\n\r\n# run all tests\r\nnpm test\r\n```\r\n\r\nFor a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).',
  //       version: 11,
  //       code: 'new Vue({\r\n  el: \'#app\',\r\n  store,\r\n  router,\r\n  template: \'<App/>\',\r\n  components: { App }\r\n})',
  //       persisted: true
  //     }
  //   }
  // },
  // mutations: {
  //   code (state, logic) {
  //     state.logics[logic.id].code = logic.code
  //   },
  //   send (state, logic) {
  //     state.logics[logic.id].persisted = false
  //     state.request.pending = true
  //   },
  //   receive (state, logic) {
  //     state.logics[logic.id].persisted = true
  //     state.request.pending = false
  //   }
  // }
})
