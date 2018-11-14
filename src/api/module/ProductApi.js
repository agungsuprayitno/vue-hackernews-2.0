import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {
 
  async getProductApi(pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/product" + queryParams).then(async (products) => {
      return await products.data
    }).catch((error) => {
      throw error
    })
  },

  async getProductByProductIdApi(productId) {
    return await VoucherGeneratorAxios.get("/v1/product/" + productId).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error
    })
  },

  async createProductApi(product) {
    return await VoucherGeneratorAxios.post("/v1/product", product).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error
    })
  },

  async updateProductApi(product) {
    return await VoucherGeneratorAxios.put("/v1/product/" + product.id, product).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error
    })
  },

  async activateProductApi(product) {
    return await VoucherGeneratorAxios.put("/v1/product/activate/" + product.id).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error
    })
  },

  async blockProductApi(product) {
    return await VoucherGeneratorAxios.put("/v1/product/block/" + product.id).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error
    })
  },

  async deleteProductApi(product) {
    return await VoucherGeneratorAxios.delete("/v1/product/" + product.id).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error
    })
  }

}
