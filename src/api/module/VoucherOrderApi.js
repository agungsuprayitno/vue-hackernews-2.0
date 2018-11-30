import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {createDownloadPopUp} from '@/util/download'
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
  async downloadApi(voucherOrder) {
    console.log(voucherOrder.voucherOrderId, voucherOrder.fileName)
    return await VoucherGeneratorAxios.get("/v1/rest/download/" + voucherOrder.voucherOrderId, {responseType: 'arraybuffer'}).then(async (voucherOrder) => {
      console.log(voucherOrder)
      createDownloadPopUp(voucherOrder.data, voucherOrder.headers, voucherOrder.fileName +".xlsx")

      return await voucherOrder.data
    }).catch((error) => {
      throw error
    })
  }
}
