import Vuex from 'vuex'
import Vue from 'vue'

import Logics from './modules/logics/logics'

import Links from './modules/sync/links'
import Connectors from './modules/sync/connectors'

import Notifications from './modules/notifications'
import Api from './modules/api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    logics: Logics,
    links: Links,
    connectors: Connectors,
    notifications: Notifications,
    api: Api
  }
})
