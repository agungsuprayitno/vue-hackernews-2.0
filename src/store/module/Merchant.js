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
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async getMerchantByMerchantId (store, merchantId) {
    await MerchantApi.getMerchantByMerchantIdApi(merchantId).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async createMerchant (store, {merchant, router}) {
    await MerchantApi.createMerchantApi( merchant).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
      router.push({name: 'merchant-list'})
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async updateMerchant (store, {merchant, router}) {

    await MerchantApi.updateMerchantApi(merchant).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
      router.push({name: 'merchant-list'})

    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async activateMerchant (store, merchant) {

    await MerchantApi.activateMerchantApi(merchant).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async blockMerchant (store, merchant) {

    await MerchantApi.blockMerchantApi(merchant).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async deleteMerchant (store, merchant) {

    await MerchantApi.deleteMerchantApi(merchant).then((merchant) => {
      store.commit('SET_MERCHANT', merchant)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
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