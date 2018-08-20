import {userApi} from '@/api'

const state  = () => ({
  user: {}
})

const getters = {

}

const actions = {
  signIn() {

  }
}

const mutations = {
  'SIGN_IN' (state, user) {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}