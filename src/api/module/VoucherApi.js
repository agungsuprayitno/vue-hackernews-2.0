import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {

  async getVoucherApi(voucherOrderId, pagination) {
    let queryParams = setPagination(pagination)
    //VoucherGeneratorAxios.headers('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRyZWFzMkBnbWFpbC5jb20iLCJqd3RJRCI6Ikp1SkEwMUo2S2dleUtFeUdEWnZNNXlhT1dLZHlxSWtkIiwidXNlcm5hbWUiOiJhbmRyZWFzMkBnbWFpbC5jb20iLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwOTAvdjEvYXV0aCIsImlhdCI6MTU0MjI3MDI0MDMwMSwiZXhwIjoxNTQyMjczODQwMzAxfQ.pvnI-U-DweyB4786iqX-QmfjJZQYH7xejGSLEp9XmjjQlL9A_kYcLiaeBu6V9FmIJli6GPUPyTDRd-wefnYoMw');
    return await VoucherGeneratorAxios.get("/v1/rest/voucher/order/" + voucherOrderId + queryParams).then(async (vouchers) => {
      return await vouchers.data
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

  async activateVoucherApi(voucher) {
    return await VoucherGeneratorAxios.put("/v1/rest/voucher/activate", voucher).then(async (voucher) => {
      return await voucher.data
    }).catch((error) => {
      throw error
    })
  },

  async revokeVoucherApi(voucher) {
    return await VoucherGeneratorAxios.put("/v1/rest/voucher/revoke", voucher).then(async (voucher) => {
      return await voucher.data
    }).catch((error) => {
      throw error
    })
  }

}
