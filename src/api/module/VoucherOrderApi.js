import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {

  async getVoucherOrderApi(pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/rest/order" + queryParams).then(async (voucherOrders) => {
      return await voucherOrders.data
    }).catch((error) => {
      throw error
    })
  },

  async createVoucherApi(voucherOrder) {
    return await VoucherGeneratorAxios.post("/v1/rest/order", voucherOrder).then(async (voucherOrder) => {
      return await voucherOrder.data
    }).catch((error) => {
      throw error
    })
  },
}
