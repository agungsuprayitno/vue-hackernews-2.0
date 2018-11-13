import {AuthApi} from '@/api'

const state  = () => ({
  token: {}
})

const getters = {

}

const actions = {
  async login (store, user) {
    await AuthApi.loginApi(user).then((token) => {
      store.commit('SET_TOKEN', token)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },
}

const mutations = {
  'SET_TOKEN' (state, token) {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}