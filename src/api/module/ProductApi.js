import {VoucherGeneratorAxios} from '@/module/HttpModule';
export default {
 
  async getProductApi() {
    return await VoucherGeneratorAxios.get("/v1/product/").then((products) => {
      return products.data
    }).catch((error) => {
      throw error
    })
  },

  async getProductByProductIdApi() {
    return await '' 
  },

  async createProductApi() {
    return await '' 
  },

  async updateProductApi() {
    return await '' 
  }
}
