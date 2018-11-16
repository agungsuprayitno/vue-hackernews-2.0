import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import LoginPage from '@/views/LoginPage.vue'
import Layout from '@/layout/Layout.vue'

import DashboardPage from '@/views/DashboardPage.vue'

import Product from '@/views/product'
import Client from '@/views/client'
import ProductVariant from '@/views/product/variant'
import Merchant from '@/views/merchant'
import User from '@/views/User'
import VoucherOrder from '@/views/voucher-order'
import Voucher from '@/views/voucher-order/voucher'

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
            },
            {
              path: '/:productId/variant',
              name: 'product-variant-list',
              component: ProductVariant.ProductVariantList
            },
            {
              path: '/:productId/variant/create',
              name: 'create-product-variant',
              component: ProductVariant.ProductVariantForm
            },
            {
              path: '/:productId/variant/edit/:productVariantId',
              name: 'edit-product-variant',
              component: ProductVariant.ProductVariantForm
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
          ]),

          ...withPrefix('/user',[
            {
              path: '/',
              name: 'user-list',
              component: User.UserList
            },
            {
              path: '/create',
              name: 'create-user',
              component: User.UserForm
            },
            {
              path: '/edit/:userId',
              name: 'edit-user',
              component: User.UserForm
            }
          ]),
          ...withPrefix('/client',[
            {
              path: '/',
              name: 'client-list',
              component: Client.ClientList
            },
            {
              path: '/create',
              name: 'create-client',
              component: Client.ClientForm
            },
            {
              path: '/edit/:clientId',
              name: 'edit-client',
              component: Client.ClientForm
            }
          ]),
          ...withPrefix('/voucher-order',[
            {
              path: '/',
              name: 'voucher-order-list',
              component: VoucherOrder.VoucherOrderList
            },
            {
              path: '/create',
              name: 'create-voucher-order',
              component: VoucherOrder.VoucherOrderForm
            },
            {
              path: '/order/:voucherOrderId',
              name: 'voucher-list',
              component: Voucher.VoucherList
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
