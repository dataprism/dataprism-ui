const state = {
  notification: null
}

const getters = {}

/* eslint-disable no-param-reassign */
const mutations = {
  CLEAR (s) {
    s.notification = null
  },
  ADD (s, data) {
    s.notification = data
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
