import {VoucherOrderApi} from '@/api'

const state  = () => ({
  voucherOrders: {},
  voucherOrder: {}
})

const getters = {

}

const actions = {
  async getVoucherOrder (store, {pagination}) {
    await VoucherOrderApi.getVoucherOrderApi(pagination).then((voucherOrders) => {
      store.commit('SET_VOUCHER_ORDERS', voucherOrders)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async createVoucher (store, voucherOrderId) {
    await VoucherOrderApi.createVoucherApi(voucherOrderId).then((voucherOrder) => {
      store.commit('SET_VOUCHER_ORDER', voucherOrder)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async downloadVoucher (store, voucherOrder) {
    await VoucherOrderApi.downloadApi(voucherOrder).then((voucherOrder) => {
      // Todo: handle with data from file if wanna process it
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  }
}

const mutations = {
  'SET_VOUCHER_ORDER' (state, voucherOrder) {
    state.voucherOrder = voucherOrder
  },
  'SET_VOUCHER_ORDERS' (state, voucherOrders) {
    state.voucherOrders = voucherOrders
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}