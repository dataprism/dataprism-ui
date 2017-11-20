import axios from 'axios'

const state = {
  evaluation: null,
  events: []
}

const getters = {
  evaluation (s) { return s.evaluation },
  events (s) { return s.events }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_EVENTS (s, data) {
    s.events = data
  },
  SET_EVALUATION (s, data) {
    s.evaluation = data
  }
}

const actions = {
  EVENTS (context, id) {
    context.commit('SET_EVENTS', [])

    return axios.get(`${this.getters['api/logicsApi']}/evaluations/${id}/events`).then(
      response => context.commit('SET_EVENTS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  DETAIL (context, id) {
    context.commit('SET_EVALUATION', [])

    return axios.get(`${this.getters['api/logicsApi']}/evaluations/${id}`).then(
      response => context.commit('SET_EVALUATION', response.data),
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
