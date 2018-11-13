import {VoucherGeneratorAxios} from '@/module/HttpModule';
export default {

  async loginApi(user) {
    return await VoucherGeneratorAxios.post("/v1/rest/auth", user).then(async (token) => {
      return await token
    }).catch((error) => {
      throw error
    })
  },
}
