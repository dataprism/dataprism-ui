import axios from 'axios'

const state = {
  nodes: []
}

const getters = {
  nodes (s) {
    return s.nodes
  }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_NODES (s, data) {
    s.nodes = data
  }
}

const actions = {
  LIST (context) {
    context.commit('SET_NODES', [])

    return axios.get(`${this.getters['api/url']}/nodes`).then(
      response => context.commit('SET_NODES', response.data),
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
