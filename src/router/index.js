import Vue from 'vue'
import Router from 'vue-router'
import EditPage from '@/components/pages/EditPage'
import Logics from '@/components/pages/logics/Logics'
import LogicPage from '@/components/pages/LogicPage'
import Link from '@/components/pages/sync/Link'
import Links from '@/components/pages/sync/Links'
import LabsPage from '@/components/pages/LabsPage'
import AboutPage from '@/components/pages/AboutPage'
import NodesPage from '@/components/pages/NodesPage'

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
        },
        {
          path: ':id',
          component: EditPage
        }
      ]
    },
    {
      path: '/links',
      name: 'Links',
      component: Links
    },
    {
      path: '/links/:id',
      name: 'Link',
      component: Link
    },
    {
      path: '/nodes',
      name: 'Nodes',
      component: NodesPage
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
