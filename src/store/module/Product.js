import {ProductApi} from '@/api'

const state  = () => ({
  products: {},
  product: {},
})

const getters = {

}

const actions = {
  async getProduct (store, {pagination}) {
    await ProductApi.getProductApi(pagination).then((products) => {
      store.commit('SET_PRODUCTS', products)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async getProductByProductId (store, productId) {
    await ProductApi.getProductByProductIdApi(productId).then((product) => {
      store.commit('SET_PRODUCT', product)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async createProduct (store, product) {
    await ProductApi.createProductApi( product).then((product) => {
      store.commit('SET_PRODUCT', product)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async updateProduct (store, product) {

    await ProductApi.updateProductApi(product).then((product) => {
      store.commit('SET_PRODUCT', product)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  }
}

const mutations = {
  'SET_PRODUCT' (state, product) {
    state.product = product
  },
  'SET_PRODUCTS' (state, products) {
    state.products = products
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}