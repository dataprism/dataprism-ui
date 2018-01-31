import Vuex from 'vuex'
import Vue from 'vue'

import Logics from './modules/logics/logics'
import LogicVersions from './modules/logics/logic_versions'
import Links from './modules/sync/links'
import SyncPlugins from './modules/sync/sync_plugins'

import Notifications from './modules/notifications'
import Api from './modules/api'
import Nodes from './modules/core/nodes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    logics: Logics,
    logicVersions: LogicVersions,
    links: Links,
    sync_plugins: SyncPlugins,
    notifications: Notifications,
    api: Api,
    nodes: Nodes
  }
})
