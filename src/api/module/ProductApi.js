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

  async getProductByProductIdApi() {
    return await '' 
  },

  async createProductApi(product) {
    return await VoucherGeneratorAxios.post("/v1/product", product).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error
    })
  },

  async updateProductApi(productId, product) {
    return await VoucherGeneratorAxios.put("/v1/product/" + productId, product).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error
    })
  }
}
