import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {

  async getUserApi(pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/user" + queryParams).then(async (users) => {
      return await users.data
    }).catch((error) => {
      throw error
    })
  },

  async getUserByUserIdApi(userId) {
    return await VoucherGeneratorAxios.get("/v1/user/" + userId).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error
    })
  },

  async createUserApi(user) {
    return await VoucherGeneratorAxios.post("/v1/user", user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error
    })
  },

  async updateUserApi(user) {
    return await VoucherGeneratorAxios.put("/v1/user/" + user.id, user).then(async (user) => {
      return await user.data
    }).catch((error) => {
      throw error
    })
  }
}
