import axios from 'axios'

function get (ctx, endpoint, SUCCESS_MUTATOR) {
  ctx.commit(SUCCESS_MUTATOR, {})

  return axios.get(endpoint).then(
    response => ctx.commit(SUCCESS_MUTATOR, response.data),
    response => ctx.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
  )
}

function post (ctx, endpoint, data, SUCCESS_MUTATOR, EDIT_MODE_MUTATOR) {
  ctx.commit(SUCCESS_MUTATOR, {})

  return axios.post(endpoint, data).then(
    () => {
      ctx.commit(EDIT_MODE_MUTATOR, false)
      ctx.commit('notifications/ADD', { message: 'Created.', level: 'info' }, { root: true })
      ctx.dispatch(SUCCESS_MUTATOR)
    },
    response => ctx.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
  )
}

function put (ctx, endpoint, data, SUCCESS_MUTATOR, EDIT_MODE_MUTATOR) {
  ctx.commit(SUCCESS_MUTATOR, {})

  return axios.put(endpoint, data).then(
    () => {
      ctx.commit(EDIT_MODE_MUTATOR, false)
      ctx.commit('notifications/ADD', { message: 'Saved.', level: 'info' }, { root: true })
      ctx.dispatch(SUCCESS_MUTATOR)
    },
    response => ctx.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
  )
}

function remove (ctx, endpoint, SUCCESS_MUTATOR, EDIT_MODE_MUTATOR) {
  ctx.commit(SUCCESS_MUTATOR, {})

  return axios.delete(endpoint).then(
    () => {
      ctx.commit(EDIT_MODE_MUTATOR, false)
      ctx.commit('notifications/ADD', { message: 'Created.', level: 'info' }, { root: true })
      ctx.dispatch(SUCCESS_MUTATOR)
    },
    response => ctx.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
  )
}

export default {
  get,
  post,
  put,
  remove
}
