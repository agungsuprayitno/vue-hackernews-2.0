import {ProductVariantApi} from '@/api'

const state  = () => ({
  productVariants: {},
  productVariant: {},
  productVariantList: {}
})

const getters = {

}

const actions = {
  async getProductVariant (store, {productId, pagination}) {
    await ProductVariantApi.getProductVariantApi(productId, pagination).then((productVariants) => {
      store.commit('SET_PRODUCT_VARIANTS', productVariants)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async getProductVariantList (store, productId) {
    await ProductVariantApi.getProductVariantListApi(productId).then((productVariantList) => {
      store.commit('SET_PRODUCT_VARIANT_LIST', productVariantList)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async getProductVariantByProductVariantId (store, {productId, productVariantId}) {
    await ProductVariantApi.getProductVariantByProductVariantIdApi(productId, productVariantId).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async createProductVariant (store, {productVariant, router}) {
    await ProductVariantApi.createProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
      router.push({name: 'product-variant-list'})
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async updateProductVariant (store, {productVariant, router}) {
    await ProductVariantApi.updateProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
      router.push({name: 'product-variant-list'})
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async activateProductVariant (store, productVariant) {
    await ProductVariantApi.activateProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async blockProductVariant (store, productVariant) {
    await ProductVariantApi.blockProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },
  
  async deleteProductVariant (store, productVariant) {
    await ProductVariantApi.deleteProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  }
}

const mutations = {
  'SET_PRODUCT_VARIANT' (state, productVariant) {
    state.productVariant = productVariant
  },
  'SET_PRODUCT_VARIANTS' (state, productVariants) {
    state.productVariants = productVariants
  },
  'SET_PRODUCT_VARIANT_LIST' (state, productVariantList) {
    state.productVariantList = productVariantList
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}