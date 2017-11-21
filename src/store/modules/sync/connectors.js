import axios from 'axios'

const state = {
  connectors: [],
  editMode: false
}

const getters = {
  connectors (s) {
    return s.connectors
  },
  editing (s) {
    return s.editMode
  }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_CONNECTORS (s, data) {
    s.connectors = data
  },
  SET_EDIT_MODE (s, editMode) {
    s.editMode = editMode
  }
}

const actions = {
  SEARCH (context) {
    context.commit('SET_CONNECTORS', [])

    return axios.get(`${this.getters['api/syncApi']}/connectors`).then(
      response => context.commit('SET_CONNECTORS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  CREATE (context, connector) {
    return axios.post(`${this.getters['api/syncApi']}/connectors`, connector).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Created.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  UPDATE (context, data) {
    return axios.post(`${this.getters['api/syncApi']}/connectors`, data).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Saved.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  DELETE (context, data) {
    return axios.delete(`${this.getters['api/syncApi']}/connectors/${data.id}`).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Removed.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  START_EDITING (context) {
    context.commit('SET_EDIT_MODE', true)
  },
  STOP_EDITING (context) {
    context.commit('SET_EDIT_MODE', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
