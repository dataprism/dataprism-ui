import axios from 'axios'

const state = {}
const getters = {}
const mutations = {}

const actions = {
  SCHEDULE (context, logicId, versionId) {
    return axios.post(`${this.getters['api/logicsApi']}/logics/${logicId}/${versionId}/schedule`, {}).then(
      () => {
        context.commit('notifications/ADD', { message: 'Scheduled.', level: 'info' }, { root: true })
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  UNSCHEDULE (context, logicId, versionId) {
    return axios.delete(`${this.getters['api/logicsApi']}/logics/${logicId}/${versionId}/schedule`).then(
      () => {
        context.commit('notifications/ADD', { message: 'Unscheduled.', level: 'info' }, { root: true })
      },
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
