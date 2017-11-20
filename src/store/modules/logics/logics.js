import axios from 'axios'

const state = {
  status: {},
  logics: [],
  editMode: false
}

const getters = {
  logics (s) {
    return s.logics
  },
  status (s) {
    return s.status
  },
  editing (s) {
    return s.editMode
  }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_LOGICS (s, data) {
    s.logics = data
  },
  SET_STATUS (s, data) {
    s.status = data
  },
  SET_EDIT_MODE (s, editMode) {
    s.editMode = editMode
  }
}

const actions = {
  SEARCH (context) {
    context.commit('SET_LOGICS', [])

    return axios.get(`${this.getters['api/logicsApi']}/logics`).then(
      response => context.commit('SET_LOGICS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  STATUS (context, logicId) {
    context.commit('SET_STATUS', {})

    return axios.get(`${this.getters['api/logicsApi']}/logics/${logicId}/status`).then(
      response => context.commit('SET_NODE', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  CREATE (context, logic) {
    return axios.post(`${this.getters['api/logicsApi']}/logics`, logic).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Created.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  UPDATE (context, logicId, data) {
    return axios.put(`${this.getters['api/logicsApi']}/logics/${logicId}`, data).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Saved.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  DELETE (context, logicId) {
    return axios.delete(`${this.getters['api/logicsApi']}/logics/${logicId}`).then(
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
