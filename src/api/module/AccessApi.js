import {VoucherGeneratorAxios} from '@/module/HttpModule';
export default {
  async getUserAccessApi() {
    return await VoucherGeneratorAxios.get("/v1/rest/user/access").then(async (accesses) => {
      return await accesses.data
    }).catch((error) => {
      throw error
    })
  }
}
