const state = {
  url: 'http://localhost:6100/v1'
}

const getters = {
  url (s) { return s.url }
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
