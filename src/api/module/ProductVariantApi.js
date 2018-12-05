import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {
 
  async getProductVariantApi(productId, pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/rest/product/" + productId + "/variant/" + queryParams).then(async (productVariants) => {
      return await productVariants.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async getProductVariantListApi(productId) {
    return await VoucherGeneratorAxios.get("/v1/rest/product/" + productId + "/variant/all").then(async (productVariantList) => {
      let productVariants = []
      productVariantList.data.forEach(data => productVariants.push({id: data.id , title: data.skuCode}))
      return await productVariants
    }).catch((error) => {
      throw error.response.data
    })
  },

  async getProductVariantByProductVariantIdApi(productId, productVariantId) {
    return await VoucherGeneratorAxios.get("/v1/rest/product/" + productId + "/variant/" + productVariantId).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async createProductVariantApi(productVariant) {
    return await VoucherGeneratorAxios.post("/v1/rest/product/" + parseInt(productVariant.productId) + "/variant/", productVariant).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async updateProductVariantApi(productVariant) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/" + parseInt(productVariant.productId) + "/variant/" + productVariant.id, productVariant).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async activateProductVariantApi(productVariant) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/" + parseInt(productVariant.productId) + "/variant/activate/" + productVariant.id).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async blockProductVariantApi(productVariant) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/" + parseInt(productVariant.productId) + "/variant/block/" + productVariant.id).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async deleteProductVariantApi(productVariant) {
    return await VoucherGeneratorAxios.delete("/v1/rest/product/" + parseInt(productVariant.productId) + "/variant/" + productVariant.id, productVariant).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error.response.data
    })
  }
}
