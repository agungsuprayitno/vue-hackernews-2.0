import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {

  async getUserApi(pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/rest/user" + queryParams).then(async (users) => {
      return await users.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async getUserByUserIdApi(userId) {
    return await VoucherGeneratorAxios.get("/v1/rest/user/" + userId).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async createUserApi(user) {
    return await VoucherGeneratorAxios.post("/v1/rest/user", user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async updateUserApi(user) {
    return await VoucherGeneratorAxios.put("/v1/rest/user/" + user.id, user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async changePasswordApi(user) {
    return await VoucherGeneratorAxios.put("/v1/rest/user/change-password", user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async sendLinkForgotPasswordApi(user) {
    return await VoucherGeneratorAxios.post("/v1/auth/forgot-password-email", user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async validatePasswordResetCodeApi(code) {
    return await VoucherGeneratorAxios.get("/v1/auth/" + code).then(async (isValidCode) => {
      return await isValidCode.data
    }).catch((error) => {
      throw error.response.data
    })
  },

  async resetPasswordApi(user) {
    return await VoucherGeneratorAxios.put("/v1/auth/reset-password", user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error.response.data
    })
  },
}
