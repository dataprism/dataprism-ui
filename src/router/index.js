import Vue from 'vue'
import Router from 'vue-router'
import EditPage from '@/components/pages/EditPage'
import InstancePage from '@/components/pages/InstancePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pages',
      component: EditPage
    },
    {
      path: '/instances',
      name: 'Instances',
      component: InstancePage
    }
  ]
})
