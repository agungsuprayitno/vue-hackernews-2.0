import {UserApi} from '@/api'

const state  = () => ({
  users: {},
  user: {},
})

const getters = {

}

const actions = {
  async getUser (store, {pagination}) {
    await UserApi.getUserApi(pagination).then((users) => {
      store.commit('SET_USERS', users)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async getUserByUserId (store, userId) {
    await UserApi.getUserByUserIdApi(userId).then((user) => {
      store.commit('SET_USER', user)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async createUser (store, user) {
    await UserApi.createUserApi( user).then((user) => {
      store.commit('SET_USER', user)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async updateUser (store, user) {

    await UserApi.updateUserApi(user).then((user) => {
      store.commit('SET_USER', user)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async changePassword (store, user) {

    await UserApi.changePasswordApi(user).then((user) => {
      //  TODO: set notification password changed sucess
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  }
}

const mutations = {
  'SET_USER' (state, user) {
    state.user = user
  },
  'SET_USERS' (state, users) {
    state.users = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}