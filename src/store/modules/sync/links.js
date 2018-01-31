import axios from 'axios'

const state = {
  links: []
}

const getters = {
  links (s) { return s.links }
}

/* eslint-disable no-param-reassign */
const mutations = {
  SET_LINKS (s, data) { s.links = !data ? [] : data }
}

const actions = {
  LIST_LINKS (context) {
    return axios.get(`${this.getters['api/url']}/sync/links`).then(
      response => context.commit('SET_LINKS', response.data),
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  CREATE (context, linkId) {
    return axios.post(`${this.getters['api/url']}/sync/links`, { id: linkId }).then(
      () => {
        context.commit('notifications/ADD', { message: 'Created.', level: 'info' }, { root: true })
        context.dispatch('LIST_LINKS')
      },
      response => {
        context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
        // this.$router.push({ name: 'Link', params: { id: linkId } })
      }
    )
  },
  UPDATE (context, data) {
    return axios.put(`${this.getters['api/url']}/sync/links/${data.id}`, data).then(
      () => {
        context.commit('notifications/ADD', { message: 'Saved.', level: 'info' }, { root: true })
        context.dispatch('LIST_LINKS')
      },
      response => context.commit('notifications/ADD', { message: response.response.data.message, level: 'error' }, { root: true })
    )
  },
  DELETE (context, data) {
    return axios.delete(`${this.getters['api/url']}/sync/links/${data.id}`).then(
      () => {
        context.commit('notifications/ADD', { message: 'Removed.', level: 'info' }, { root: true })
        context.dispatch('LIST_LINKS')
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
