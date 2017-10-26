import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/components/pages/EditPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pages',
      component: Edit
    }
  ]
})
