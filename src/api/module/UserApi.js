import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {

  async getUserApi(pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/rest/user" + queryParams).then(async (users) => {
      return await users.data
    }).catch((error) => {
      throw error
    })
  },

  async getUserByUserIdApi(userId) {
    return await VoucherGeneratorAxios.get("/v1/rest/user/" + userId).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error
    })
  },

  async createUserApi(user) {
    return await VoucherGeneratorAxios.post("/v1/rest/user", user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error
    })
  },

  async updateUserApi(user) {
    return await VoucherGeneratorAxios.put("/v1/rest/user/" + user.id, user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error
    })
  },

  async changePasswordApi(user) {
    return await VoucherGeneratorAxios.put("/v1/rest/user/change-password", user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  },

  async sendLinkForgotPasswordApi(email) {
    return await VoucherGeneratorAxios.post("/v1/auth/forgot-password-email", email).then(async (user) => {
      return await user.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  }
}
