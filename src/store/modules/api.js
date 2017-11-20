const state = {
  base: {
    logics: 'http://localhost:6300/v1',
    sync: 'http://localhost:6400/v1',
    labs: 'http://localhost:6500/v1'
  }
}

const getters = {
  syncApi (s) { return s.base.sync },
  logicsApi (s) { return s.base.logics },
  labsApi (s) { return s.base.labs }
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
