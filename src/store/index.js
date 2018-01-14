import Vuex from 'vuex'
import Vue from 'vue'

import Logics from './modules/logics/logics'
import LogicVersions from './modules/logics/logic_versions'
import Links from './modules/sync/links'
import Connectors from './modules/sync/connectors'

import Notifications from './modules/notifications'
import Api from './modules/api'
import Nodes from './modules/core/nodes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    logics: Logics,
    logicVersions: LogicVersions,
    links: Links,
    connectors: Connectors,
    notifications: Notifications,
    api: Api,
    nodes: Nodes
  }
})
