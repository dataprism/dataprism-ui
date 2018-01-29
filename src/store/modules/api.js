const state = {
  logicsApi: 'http://localhost:6300/v1'
}

const getters = {
  logicsApi (s) { return s.logicsApi }
}

/* eslint-disable no-param-reassign */
const mutations = {}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
