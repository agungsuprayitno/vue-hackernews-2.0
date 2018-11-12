import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {

  async getClientApi(pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/client" + queryParams).then(async (clients) => {
      return await clients.data
    }).catch((error) => {
      throw error
    })
  },

  async getClientByClientIdApi(clientId) {
    return await VoucherGeneratorAxios.get("/v1/client/" + clientId).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  },

  async createClientApi(client) {
    return await VoucherGeneratorAxios.post("/v1/client", client).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  },

  async updateClientApi(client) {
    return await VoucherGeneratorAxios.put("/v1/client/" + client.id, client).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  }
}
