import {VoucherApi} from '@/api'
import {VoucherOrderApi} from '@/api'

const state  = () => ({
  vouchers: {},
  voucher: {},
  voucherOrders: {},
  voucherOrder: {}
})

const getters = {

}

const actions = {
  async getVoucher (store, {voucherOrderId, pagination}) {
    await VoucherApi.getVoucherApi(voucherOrderId, pagination).then((vouchers) => {
      store.commit('SET_VOUCHERS', vouchers)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async createVoucher (store, {voucherOrder, router}) {
    console.log(voucherOrder)
    await VoucherOrderApi.createVoucherApi(voucherOrder).then((voucherOrder) => {
      store.commit('SET_VOUCHER_ORDER', voucherOrder)
      console.log(router)
      router.push({name: 'voucher-order-list'})
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async activateVoucher (store, voucher) {
    await VoucherApi.activateVoucherApi(voucher).then((voucher) => {
      store.commit('SET_VOUCHER', voucher)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async revokeVoucher (store, voucher) {
    await VoucherApi.revokeVoucherApi(voucher).then((voucher) => {
      store.commit('SET_VOUCHER', voucher)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async updateMerchant (store, merchant) {

    await VoucherOrderApi.updateMerchantApi(voucherOrder).then((voucherOrder) => {
      store.commit('SET_VOUCHER_ORDER', voucherOrder)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  }
}

const mutations = {
  'SET_VOUCHER' (state, voucher) {
    state.voucher = voucher
  },
  'SET_VOUCHERS' (state, vouchers) {
    state.vouchers = vouchers
  },
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