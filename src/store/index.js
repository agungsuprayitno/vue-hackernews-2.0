import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//  Component Store
import Pagination from './component/Pagination'

//  Module Store
import User from './module/User'
import Access from './module/Access'
import Product from './module/Product'
import Client from './module/Client'
import ProductVariant from './module/ProductVariant'
import Merchant from './module/Merchant'
import VoucherOrder from './module/VoucherOrder'
import Voucher from './module/Voucher'

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
  modules:{
    User,
    Access,
    Product,
    Client,
    ProductVariant,
    Merchant,
    VoucherOrder,
    Voucher,
    Pagination
  }
})

export function createStore () {
  return store
}

export default store