import {ProductApi} from '@/api'

const state  = () => ({
  products: [],
  product: {}
})

const getters = {

}

const actions = {
  getProduct (store) {
    ProductApi.getProductApi().then((products) => {
      store.commit('SET_PRODUCTS', products)
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
  'SET_PRODUCTS' (state, products) {
    state.products = products
  },
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