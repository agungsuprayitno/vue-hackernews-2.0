import {VoucherGeneratorAxios} from '@/module/HttpModule';
export default {

  async loginApi(user) {
    return await VoucherGeneratorAxios.post("/v1/auth", user).then(async (token) => {
      return await VoucherGeneratorAxios.get("/v1/auth", {headers: {Authorization: 'Bearer ' + token.data.token}}).then(async (userDetails) => {
        let user = {userDetails: userDetails.data, token: token.data}
        return await user
      }).catch((error) => {
        throw error
      })
    }).catch((error) => {
      throw error
    })
  },
}
