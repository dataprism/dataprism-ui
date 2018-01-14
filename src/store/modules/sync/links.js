import axios from 'axios'

const state = {
  links: [],
  editMode: false,
  connector: {}
}

const getters = {
  links (s) {
    return s.links
  },
  editing (s) {
    return s.editMode
  },
  connector (s) {
    return s.connector
  }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_LINKS (s, data) {
    s.links = data
  },
  SET_EDIT_MODE (s, editMode) {
    s.editMode = editMode
  },
  SET_CONNECTOR (s, connector) {
    s.connector = connector
  }
}

const actions = {
  SEARCH (context) {
    context.commit('SET_LINKS', [])

    return axios.get(`${this.getters['api/url']}/links`).then(
      response => context.commit('SET_LINKS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  CREATE (context, link) {
    return axios.post(`${this.getters['api/url']}/links`, link).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Created.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  UPDATE (context, data) {
    return axios.put(`${this.getters['api/url']}/links/${data.id}`, data).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Saved.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  DELETE (context, data) {
    return axios.delete(`${this.getters['api/url']}/links/${data.id}`).then(
      () => {
        context.commit('SET_EDIT_MODE', false)
        context.commit('notifications/ADD', { message: 'Removed.', level: 'info' }, { root: true })
        context.dispatch('SEARCH')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  START_EDITING (context, link) {
    context.commit('SET_EDIT_MODE', true)

    if (link && link.connector_id) {
      return axios.get(`${this.getters['api/url']}/connectors/${link.connector_id}`).then(
        response => context.commit('SET_CONNECTOR', response.data),
        response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
      )
    }
  },
  STOP_EDITING (context) {
    context.commit('SET_EDIT_MODE', false)
    context.commit('SET_CONNECTOR', {})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
