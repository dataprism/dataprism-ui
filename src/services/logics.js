const uri = 'http://192.168.1.6:8080/v1'

export default {
  list () {
    return call(uri, 'GET', 'logics')
  },
  get (logicName) {
    return call(uri, 'GET', 'logics', logicName)
  },
  create (logicObj) {
    console.log('creating logic...', logicObj)
    // return call(uri, 'POST', 'logics', undefined, logicObj)

    // -- mock response
    return mockResp({
      name: 'logicResponse',
      lang: 'JavaScript',
      status: 'ok',
      description: '# dataprism-kfunc-ui\r\n\r\n> A Vue frontend application used for editing generating Kafka Streams code snippets.\r\n\r\n## Build Setup\r\n\r\n``` bash\r\n# install dependencies\r\nnpm install\r\n\r\n# serve with hot reload at localhost:8080\r\nnpm run dev\r\n\r\n# build for production with minification\r\nnpm run build\r\n\r\n# build for production and view the bundle analyzer report\r\nnpm run build --report\r\n\r\n# run unit tests\r\nnpm run unit\r\n\r\n# run all tests\r\nnpm test\r\n```\r\n\r\nFor a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).',
      version: 1,
      code: 'something_totally_different: {\r\n    code (state, blob) {\r\n      state.request.payload = blob\r\n    },\r\n    send (state) {\r\n      state.request.pending = true\r\n    },\r\n    receive (state) {\r\n      console.log(\'receive\')\r\n      state.request.pending = false\r\n    }\r\n  }'
    }, 500)
  },
  remove (logicName) {
    return call(uri, 'DELETE', 'logics', logicName)
  }
}

function call (uri, httpMethod, procedure, query, body) {
  let endpoint = `${uri}/${procedure}`

  if (typeof query !== 'undefined') endpoint = endpoint + `/${query}`

  let req = {
    method: httpMethod
  }

  if (httpMethod === 'POST') {
    req.headers = { 'Content-Type': 'application/json' }
    req.body = JSON.stringify(body)
  }

  console.log(req)
  return fetch(endpoint, req)
}

function mockResp (resp, t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(resp)
    }, t)
  })
}
