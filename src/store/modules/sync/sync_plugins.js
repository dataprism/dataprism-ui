import axios from 'axios'

const state = {
  plugins: [],
  inputs: [],
  outputs: []
}

const getters = {
  plugins (s) { return s.plugins },
  inputs (s) { return s.inputs },
  outputs (s) { return s.outputs }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_PLUGINS (s, data) { s.plugins = data },
  SET_INPUTS (s, data) { s.inputs = data },
  SET_OUTPUTS (s, data) { s.outputs = data }
}

const actions = {
  LIST_PLUGINS (context) {
    context.commit('SET_PLUGINS', [])

    return axios.get(`${this.getters['api/url']}/sync/plugins`).then(
      response => context.commit('SET_PLUGINS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  LIST_INPUTS (context) {
    context.commit('SET_INPUTS', [])

    return axios.get(`${this.getters['api/url']}/sync/plugins/inputs`).then(
      response => context.commit('SET_INPUTS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  LIST_OUTPUTS (context) {
    context.commit('SET_OUTPUTS', [])

    return axios.get(`${this.getters['api/url']}/sync/plugins/outputs`).then(
      response => context.commit('SET_OUTPUTS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
