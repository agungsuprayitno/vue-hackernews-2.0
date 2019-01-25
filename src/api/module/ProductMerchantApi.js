import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {

  async getMerchantListApi() {
    return await VoucherGeneratorAxios.get("/v1/rest/merchant/all").then(async (merchantList) => {
      return await merchantList.data
    }).catch((error) => {
      throw error.response.data
    })
  },
 
  async getProductMerchantApi(productId, pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/rest/product/" + productId + "/product-merchant/" + queryParams).then(async (productMerchants) => {
      return await productMerchants.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async getProductListApi() {
    return await VoucherGeneratorAxios.get("/v1/rest/product/all").then(async (productList) => {
      return await productList.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async getMerchantProductApi(merchantId, pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/rest/merchant/" + merchantId + "/product-merchant/" + queryParams).then(async (productMerchants) => {
      return await productMerchants.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async getProductMerchantListApi(productId) {
    return await VoucherGeneratorAxios.get("/v1/rest/product/" + productId + "/product-merchant/all").then(async (productMerchantList) => {
      let productMerchants = []
      productMerchantList.data.forEach(data => productMerchants.push({id: data.id , title: data.skuCode}))
      return await productMerchants
    }).catch((error) => {
      throw error.response.data
    })
  },

  async getProductMerchantByProductMerchantIdApi(productId, productMerchantId) {
    return await VoucherGeneratorAxios.get("/v1/rest/product/" + productId + "/product-merchant/" + productMerchantId).then(async (productMerchant) => {
      return await productMerchant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async createProductMerchantApi(productMerchant) {
    return await VoucherGeneratorAxios.post("/v1/rest/product/" + parseInt(productMerchant.productId) + "/product-merchant/", productMerchant).then(async (productMerchant) => {
      return await productMerchant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async updateProductMerchantApi(productMerchant) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/" + parseInt(productMerchant.productId) + "/product-merchant/" + productMerchant.id, productMerchant).then(async (productMerchant) => {
      return await productMerchant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async activateProductMerchantApi(productMerchant) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/" + parseInt(productMerchant.productId) + "/product-merchant/activate/" + productMerchant.id).then(async (productMerchant) => {
      return await productMerchant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async blockProductMerchantApi(productMerchant) {
    return await VoucherGeneratorAxios.put("/v1/rest/product/" + parseInt(productMerchant.productId) + "/product-merchant/block/" + productMerchant.id).then(async (productMerchant) => {
      return await productMerchant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async deleteProductMerchantApi(productMerchant) {
    return await VoucherGeneratorAxios.delete("/v1/rest/product/" + parseInt(productMerchant.productId) + "/product-merchant/delete/" + productMerchant.id, productMerchant).then(async (productMerchant) => {
      return await productMerchant.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async enableAllMerchantForProductApi(productId) {
    return await VoucherGeneratorAxios.post("/v1/rest/product/" + parseInt(productId) + "/product-merchant/enable-all-merchant").then(async (productMerchants) => {
      return await productMerchants.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  //  called from store merchant -> product page
  async enableAllProductForMerchantApi(merchantId) {
    return await VoucherGeneratorAxios.post("/v1/rest/merchant/" + parseInt(merchantId) + "/product-merchant").then(async (merchantProduct) => {
      return await merchantProduct.data
    }).catch((error) => {
      throw error.response.data
    })
  }
}
