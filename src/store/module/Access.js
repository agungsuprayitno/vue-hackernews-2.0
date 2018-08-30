import {AccessApi} from '@/api'

const state  = () => ({
  access: []
})

const getters = {

}

const actions = {
 async getUserAccess(store) {
    let accesses = await AccessApi.getUserAccessApi()
    store.commit('SET_ACCESS', accesses)
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