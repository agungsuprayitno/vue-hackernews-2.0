import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import LoginPage from '@/views/LoginPage.vue'
import Layout from '@/layout/Layout.vue'

import DashboardPage from '@/views/DashboardPage.vue'
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'
import ResetPasswordPageSubmitEmail from '@/views/ResetPasswordPageSubmitEmail.vue'
import InvalidResetPasswordCodePage from '@/views/InvalidResetPasswordCodePage.vue'

import Product from '@/views/product'
import Client from '@/views/client'
import ProductVariant from '@/views/product/variant'
import ProductMerchant from '@/views/product/merchant'
import MerchantProduct from '@/views/merchant/product'
import Merchant from '@/views/merchant'
import User from '@/views/user'
import VoucherOrder from '@/views/voucher-order'
import Voucher from '@/views/voucher-order/voucher'


//  Middleware
import AuthMiddleware from '@/middleware/AuthMiddleware'
import ResetPasswordMiddleware from '@/middleware/ResetPasswordMiddleware'

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
      { path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {notRequiresAuth: true}
      },
      { path: '/reset-password',
        name: 'reset-password',
        component: ResetPasswordPage,
        meta: {notRequiresAuth: true},
        //  TODO: validate link from email
        beforeEnter: (to, from, next) => {
          ResetPasswordMiddleware(to, from, next)
        }
      },
      { path: '/reset-password-submit-email',
        name: 'reset-password-submit-email',
        component: ResetPasswordPageSubmitEmail,
        meta: {notRequiresAuth: true}
      },
      { path: '/invalid-reset-password-code',
        name: 'invalid-reset-password-code',
        component: InvalidResetPasswordCodePage,
        meta: {notRequiresAuth: true}
      },
      { path: '/',
        redirect: '/dashboard',
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
            },
            {
              path: '/:productId/merchant',
              name: 'product-merchant-list',
              component: ProductMerchant.ProductMerchantList
            },
            {
              path: '/:productId/merchant/create',
              name: 'create-product-merchant',
              component: ProductMerchant.ProductMerchantForm
            },
            {
              path: '/:productId/merchant/edit/:productMerchantId',
              name: 'edit-product-merchant',
              component: ProductMerchant.ProductMerchantForm
            },
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
            },
            {
              path: '/:merchantId/product',
              name: 'merchant-product-list',
              component: MerchantProduct.MerchantProductList
            },
            {
              path: '/:merchantId/product/create',
              name: 'create-merchant-product',
              component: MerchantProduct.MerchantProductForm
            },
            {
              path: '/:merchantId/product/edit/:merchantProductId',
              name: 'edit-merchant-product',
              component: MerchantProduct.MerchantProductForm
            },
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
            },
            {
              path: '/change-password',
              name: 'change-password',
              component: User.UserChangePasswordForm
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
