import {VoucherGeneratorAxios} from '@/module/HttpModule';
import {setPagination} from '@/util/pagination'
export default {

  async getClientApi(pagination) {
    let queryParams = setPagination(pagination)
    return await VoucherGeneratorAxios.get("/v1/rest/client" + queryParams).then(async (clients) => {
      return await clients.data
    }).catch((error) => {
      throw error
    })
  },

  async getClientByClientIdApi(clientId) {
    return await VoucherGeneratorAxios.get("/v1/rest/client/" + clientId).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  },

  async createClientApi(client) {
    return await VoucherGeneratorAxios.post("/v1/rest/client", client).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  },

  async updateClientApi(client) {
    return await VoucherGeneratorAxios.put("/v1/rest/client/" + client.id, client).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  },

  async activateClientApi(client) {
    return await VoucherGeneratorAxios.put("/v1/rest/client/activate/" + client.id, client).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  },

  async blockClientApi(client) {
    return await VoucherGeneratorAxios.put("/v1/rest/client/block/" + client.id, client).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  },

  async deleteClientApi(client) {
    return await VoucherGeneratorAxios.delete("/v1/rest/client/" + client.id, client).then(async (client) => {
      return await client.data
    }).catch((error) => {
      throw error
    })
  }
}
