import {ProductApi} from '@/api'

const state  = () => ({
  product: {},
})

const getters = {

}

const actions = {
  async getProduct (store) {
    await ProductApi.getProductApi().then((products) => {
      store.commit('SET_PRODUCT', products)
    })
  },

  getProductByProductId () {

  },

  createProduct () {

  },

  updateProduct () {

  }
}

const mutations = {
  'SET_PRODUCT' (state, product) {
    state.product = product
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}