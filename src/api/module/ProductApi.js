import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {
 
  async getProductApi(pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/rest/product" + queryParams).then(async (products) => {
      return await products.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async getAllProductListApi() {
    return await VoucherGeneratorAxios.get("/v1/rest/product/all").then(async (productList) => {
      let products = []
      productList.data.forEach(data => products.push({id: data.id , title: data.name}))
      return await products
    }).catch((error) => {
      throw error.response.data
    })
  },
  
  async getProductByProductIdApi(productId) {
    return await VoucherGeneratorAxios.get("/v1/rest/product/" + productId).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async createProductApi(product) {
    return await VoucherGeneratorAxios.post("/v1/rest/product", product).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async updateProductApi(product) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/" + product.id, product).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async activateProductApi(product) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/activate/" + product.id).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async blockProductApi(product) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/block/" + product.id).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async deleteProductApi(product) {
    return await VoucherGeneratorAxios.delete("/v1/rest/product/" + product.id).then(async (product) => {
      return await product.data
    }).catch((error) => {
      throw error.response.data
    })
  }

}
