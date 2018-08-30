import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import User from './module/User'
import Access from './module/Access'

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
  modules:{
    User,
    Access
  }
})

export function createStore () {
  return store
}

export default store