import {ClientApi} from '@/api'

const state  = () => ({
  clients: {},
  client: {},
})

const getters = {

}

const actions = {
  async getClient (store, {pagination}) {
    await ClientApi.getClientApi(pagination).then((clients) => {
      store.commit('SET_CLIENTS', clients)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async getClientByClientId (store, clientId) {
    await ClientApi.getClientByClientIdApi(clientId).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async createClient (store, client) {
    await ClientApi.createClientApi( client).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  },

  async updateClient (store, client) {

    await ClientApi.updateClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      console.log(error)
    })
  }
}

const mutations = {
  'SET_CLIENT' (state, client) {
    state.client = client
  },
  'SET_CLIENTS' (state, clients) {
    state.clients = clients
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}