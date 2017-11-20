import axios from 'axios'

const state = {
  node: null,
  nodes: []
}

const getters = {
  node (s) { return s.node },
  nodes (s) { return s.nodes }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_NODES (s, data) {
    s.nodes = data
  },
  SET_NODE (s, data) {
    s.node = data
  }
}

const actions = {
  SEARCH (context) {
    context.commit('SET_NODES', [])

    return axios.get(`${this.getters['api/logicsApi']}/nodes`).then(
      response => context.commit('SET_NODES', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  DETAIL (context, id) {
    context.commit('SET_NODE', [])

    return axios.get(`${this.getters['api/logicsApi']}/nodes/${id}`).then(
      response => context.commit('SET_NODE', response.data),
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
