import {UserApi} from '@/api'

const state  = () => ({
  users: {},
  user: {},
  isValidCode: true
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
  },
  async sendLinkForgotPassword (store, user) {

    await UserApi.sendLinkForgotPasswordApi(user).then((user) => {
      //  TODO: set notification send link to email
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async validatePasswordResetCode(store, code) {
    await UserApi.validatePasswordResetCodeApi(code).then((validCode) => {
      store.commit('SET_IS_VALID_CODE', validCode)
    }).catch(error => {
      console.log(error)
    })
  },

  async resetPassword (store, {user, router}) {

    await UserApi.resetPasswordApi(user).then((user) => {
      //  TODO: set notification password changed sucess
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },
}

const mutations = {
  'SET_USER' (state, user) {
    state.user = user
  },
  'SET_USERS' (state, users) {
    state.users = users
  },
  'SET_IS_VALID_CODE' (state, validCode) {
    state.isValidCode = validCode
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}