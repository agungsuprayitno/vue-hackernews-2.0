import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {
 
  async getProductVariantApi(productId, pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/product/" + productId + "/variant/" + queryParams).then(async (productVariants) => {
      return await productVariants.data
    }).catch((error) => {
      throw error
    })
  },

  async getProductVariantByProductVariantIdApi(productId, productVariantId) {
    return await VoucherGeneratorAxios.get("/v1/product/" + productId + "/variant/" + productVariantId).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error
    })
  },

  async createProductVariantApi(productVariant) {
    return await VoucherGeneratorAxios.post("/v1/product/" + parseInt(productVariant.product_id) + "/variant/", productVariant).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error
    })
  },

  async updateProductVariantApi(productVariant) {
    return await VoucherGeneratorAxios.put("/v1/product/" + parseInt(productVariant.product_id) + "/variant/" + productVariant.id, productVariant).then(async (productVariant) => {
      return await productVariant.data
    }).catch((error) => {
      throw error
    })
  }
}
