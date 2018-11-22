import {AuthApi} from '@/api'
import {createCookie, key, keyUserInfo} from "@/module/CacheModule";

const state  = () => ({
  token: {},
  userDetails: {}
})

const getters = {

}

const actions = {
  async login (store, {user, router}) {
    //  get Token
    await AuthApi.loginApi(user).then(async (user)=> {
      //  commit token to state
      await store.commit('SET_TOKEN', user.token)
      // set token on cookies
      await createCookie(key, user.token)

      //  commit token to state
      await store.commit('SET_USER_DETAILS', user.token)
      // set token on cookies
      await createCookie(keyUserInfo, user.userDetails)

      // redirect to home
      location.href = "dashboard"
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  }
}

const mutations = {
  'SET_TOKEN' (state, token) {
    state.token = token
  },
  'SET_USER_DETAILS' (state, userDetails) {
    state.userDetails = userDetails
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}