import {ProductApi} from '@/api'

const state  = () => ({
  pagination: {}
})

const getters = {

}

const actions = {
}

const mutations = {
  'SET_PAGINATION' (state, pagination) {
    state.pagination = pagination
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}