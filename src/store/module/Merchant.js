import {MerchantApi} from '@/api'

const state  = () => ({
  merchants: {},
  merchant: {},
})

const getters = {

}

const actions = {
  async getMerchant (store, {pagination}) {
    await MerchantApi.getMerchantApi(pagination).then((merchants) => {
      store.commit('SET_MERCHANTS', merchants)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async getMerchantByMerchantId (store, merchantId) {
    await MerchantApi.getMerchantByMerchantIdApi(merchantId).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async createMerchant (store, merchant) {
    await MerchantApi.createMerchantApi( merchant).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async updateMerchant (store, merchant) {

    await MerchantApi.updateMerchantApi(merchant).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  }
}

const mutations = {
  'SET_MERCHANT' (state, merchant) {
    state.merchant = merchant
  },
  'SET_MERCHANTS' (state, merchants) {
    state.merchants = merchants
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}