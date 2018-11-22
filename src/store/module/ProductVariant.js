import {ProductVariantApi} from '@/api'

const state  = () => ({
  productVariants: {},
  productVariant: {},
})

const getters = {

}

const actions = {
  async getProductVariant (store, {productId, pagination}) {
    await ProductVariantApi.getProductVariantApi(productId, pagination).then((productVariants) => {
      store.commit('SET_PRODUCT_VARIANTS', productVariants)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async getProductVariantByProductVariantId (store, {productId, productVariantId}) {
    await ProductVariantApi.getProductVariantByProductVariantIdApi(productId, productVariantId).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async createProductVariant (store, {productVariant, router}) {
    await ProductVariantApi.createProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
      router.push({name: 'product-variant-list'})
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async updateProductVariant (store, {productVariant, router}) {
    await ProductVariantApi.updateProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
      router.push({name: 'product-variant-list'})
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async activateProductVariant (store, productVariant) {
    await ProductVariantApi.activateProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async blockProductVariant (store, productVariant) {
    await ProductVariantApi.blockProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },
  
  async deleteProductVariant (store, productVariant) {
    await ProductVariantApi.deleteProductVariantApi(productVariant).then((productVariant) => {
      store.commit('SET_PRODUCT_VARIANT', productVariant)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  }
}

const mutations = {
  'SET_PRODUCT_VARIANT' (state, productVariant) {
    state.productVariant = productVariant
  },
  'SET_PRODUCT_VARIANTS' (state, productVariants) {
    state.productVariants = productVariants
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}