import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import LoginPage from '@/views/LoginPage.vue'

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: "/", name: "Login", component: LoginPage },
    ]
  })
}
