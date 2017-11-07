const uri = 'http://192.168.1.6:8080/v1'

export default {
  list () {
    return call(uri, 'GET', 'logics')
  },
  get (logicName) {
    return call(uri, 'GET', 'logics', logicName)
  },
  create (logicObj) {
    return call(uri, 'POST', 'logics', undefined, logicObj)
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
