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

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
  modules:{
    User,
    Access,
    Product,
    Client,
    Pagination
  }
})

export function createStore () {
  return store
}

export default store