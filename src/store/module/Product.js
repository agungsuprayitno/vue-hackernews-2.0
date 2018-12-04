import {ProductApi} from '@/api'

const state  = () => ({
  products: {},
  product: {},
  productList: {}
})

const getters = {

}

const actions = {
  async getProduct (store, {pagination}) {
    await ProductApi.getProductApi(pagination).then((products) => {
      store.commit('SET_PRODUCTS', products)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async getAllProductList (store) {
    await ProductApi.getAllProductListApi().then((productList) => {
      store.commit('SET_PRODUCT_LIST', productList)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async getProductByProductId (store, productId) {
    await ProductApi.getProductByProductIdApi(productId).then((product) => {
      store.commit('SET_PRODUCT', product)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async createProduct (store, {product, router}) {
    await ProductApi.createProductApi(product).then((product) => {
      store.commit('SET_PRODUCT', product)

      //  redirect to list of product
      router.push({name: "product-list"})
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async updateProduct (store, {product, router}) {

    await ProductApi.updateProductApi(product).then((product) => {
      store.commit('SET_PRODUCT', product)

      //  redirect to list of product
      router.push({name: "product-list"})
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async activateProduct (store, product) {

    await ProductApi.activateProductApi(product).then((product) => {
      store.commit('SET_PRODUCT', product)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async blockProduct (store, product) {

    await ProductApi.blockProductApi(product).then((product) => {
      store.commit('SET_PRODUCT', product)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async deleteProduct (store, product) {

    await ProductApi.deleteProductApi(product).then((product) => {
      store.commit('SET_PRODUCT', product)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  }

}

const mutations = {
  'SET_PRODUCT' (state, product) {
    state.product = product
  },
  'SET_PRODUCTS' (state, products) {
    state.products = products
  },
  'SET_PRODUCT_LIST' (state, productList) {
    state.productList = productList
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}