import Vue from 'vue'
import Router from 'vue-router'
import EditPage from '@/components/pages/EditPage'
import Logics from '@/components/pages/logics/Logics'
import LogicPage from '@/components/pages/LogicPage'
import SyncPage from '@/components/pages/SyncPage'
import Connectors from '@/components/pages/sync/Connectors'
import Links from '@/components/pages/sync/Links'
import LabsPage from '@/components/pages/LabsPage'
import AboutPage from '@/components/pages/AboutPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/edit',
      // name: 'Editor',
      component: EditPage
    },
    {
      path: '/logic',
      name: 'Logic',
      component: LogicPage,
      children: [
        {
          path: 'logics',
          name: 'Logics',
          component: Logics
        }
      ]
    },
    {
      path: '/sync',
      name: 'Sync',
      component: SyncPage,
      children: [
        {
          path: 'connectors',
          name: 'Connectors',
          component: Connectors
        },
        {
          path: 'links',
          name: 'Links',
          component: Links
        }
      ]
    },
    {
      path: '/labs',
      // name: 'Labs',
      component: LabsPage
    },
    {
      path: '/about',
      // name: 'About',
      component: AboutPage
    }
  ]
})
