import axios from 'axios'

const state = {
  logicVersions: [],
  editMode: false
}

const getters = {
  logicVersions (s) {
    console.log('getting logic versions')
    return s.logicVersions
  },
  editing (s) {
    return s.editMode
  }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_LOGIC_VERSIONS (s, data) {
    console.log('setting logic versions...', data)
    s.logicVersions = data
  },
  SET_EDIT_MODE (s, editMode) {
    s.editMode = editMode
  }
}

const actions = {
  SEARCH (context, logicId) {
    context.commit('SET_LOGIC_VERSIONS', [])

    return axios.get(`${this.getters['api/logicsApi']}/logics/${logicId}/versions`).then(
      response => context.commit('SET_LOGIC_VERSIONS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  CREATE (context, { logicId, data }) {
    return axios.post(`${this.getters['api/logicsApi']}/logics/${logicId}/versions`, data).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Created.', level: 'info' }, { root: true })
        context.dispatch('SEARCH', logicId)
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  UPDATE (context, logicId, versionId, data) {
    return axios.put(`${this.getters['api/logicsApi']}/logics/${logicId}/${versionId}`, data).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Saved.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  DELETE (context, logicId, versionId) {
    return axios.delete(`${this.getters['api/logicsApi']}/logics/${logicId}/${versionId}`).then(
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
