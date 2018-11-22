import {AccessApi} from '@/api'
import {readCookie, keyUserInfo} from "@/module/CacheModule";

const state  = () => ({
  access: []
})

const getters = {

}

const actions = {
  async getUserAccess(store) {
    let userId = 0
    if(keyUserInfo) {
      userId = readCookie(keyUserInfo).userId
    }
    let accesses = await AccessApi.getUserAccessApi(userId)
    store.commit('SET_ACCESS', accesses.data)
  }
}

const mutations = {
  'SET_ACCESS' (state, accesses) {
    state.access = accesses
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}