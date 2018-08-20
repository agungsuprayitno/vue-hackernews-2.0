import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import User from './module/User'

const debug = process.env.NODE_ENV !== 'production'

export function createStore () {
  return new Vuex.Store({
    modules:{
      User
    }
  })
}
