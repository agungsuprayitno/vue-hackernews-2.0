import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import LoginPage from '@/views/LoginPage.vue'
import Layout from '@/layout/Layout.vue'

import DashboardPage from '@/views/DashboardPage.vue'

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/login', name: 'login', component: LoginPage },
      { path: '/', name: 'home', component: Layout,
        children: [
          {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardPage
          }
        ]
      },
    ]
  })
}
