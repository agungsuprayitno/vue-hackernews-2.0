import {VoucherApi} from '@/api'
import {VoucherOrderApi} from '@/api'

const state  = () => ({
  vouchers: {},
  voucher: {}
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
    await VoucherOrderApi.createVoucherApi(voucherOrder).then((voucherOrder) => {
      // store.commit('SET_VOUCHER_ORDER', voucherOrder)
      router.push({name: 'voucher-order-list'})
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  // async activateVoucher (store, voucher) {
  //   await VoucherApi.activateVoucherApi(voucher).then((voucher) => {
  //     store.commit('SET_VOUCHER', voucher)
  //   }).catch(error => {
  //     //  TODO: Handle Error, set to be form or toast
  //     console.log(error)
  //   })
  // },

  async revokeVoucher (store, voucher) {
    await VoucherApi.revokeVoucherApi(voucher).then((revokedVoucher) => {
      store.commit('SET_VOUCHER', revokedVoucher)
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
