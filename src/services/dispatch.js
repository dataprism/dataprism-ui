export default {
  send (data) {
    let request = {}

    request.instanceCount = data.instanceCount
    request.name = data.name
    request.language = data.language
    request.payload = data.payload

    return fetch('http://localhost:7000/v1/logics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
  }
}
