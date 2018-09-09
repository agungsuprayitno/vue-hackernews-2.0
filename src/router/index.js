import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import LoginPage from '@/views/LoginPage.vue'
import Layout from '@/layout/Layout.vue'

import DashboardPage from '@/views/DashboardPage.vue'

import Product from '@/views/product'
import Merchant from '@/views/merchant'

//  Middleware
import AuthMiddleware from '@/middleware/AuthMiddleware'

const withPrefix = (prefix, routes) => 
    routes.map( (route) => {
        route.path = prefix + route.path;
        return route;
    });

export function createRouter () {
  const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/login', name: 'login', component: LoginPage },
      { path: '/',
        name: 'home',
        component: Layout,
        meta: {requiresAuth: true},
        children: [
          {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardPage
          },

          ...withPrefix('/product',[
            {
              path: '/',
              name: 'product-list',
              component: Product.ProductListPage
            },
            {
              path: '/create',
              name: 'create-product',
              component: Product.ProductForm
            },
            {
              path: '/edit/:productId',
              name: 'edit-product',
              component: Product.ProductForm
            }
          ]),
          ...withPrefix('/merchant',[
            {
              path: '/',
              name: 'merchant-list',
              component: Merchant.MerchantList
            },
            {
              path: '/create',
              name: 'create-merchant',
              component: Merchant.MerchantForm
            },
            {
              path: '/edit/:merchantId',
              name: 'edit-merchant',
              component: Merchant.MerchantForm
            }
          ])

        ]
      },
    ]
  })
  
  router.beforeEach((to, from, next) => {
    AuthMiddleware(to, from, next)

    next()
  })

  return router

}
