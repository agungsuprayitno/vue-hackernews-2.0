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
      // console.log(error)
      alert(error)
    })
  },

  async getClientByClientId (store, clientId) {
    await ClientApi.getClientByClientIdApi(clientId).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      // console.log(error)
      alert(error)
    })
  },

  async createClient (store, {client, router}) {
    await ClientApi.createClientApi( client).then((client) => {
      store.commit('SET_CLIENT', client)

      //  redirect to list of product
      router.push({name: "client-list"})
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      // console.log(error)
      alert(error)
    })
  },

  async updateClient (store, {client, router}) {

    await ClientApi.updateClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)

      //  redirect to list of product
      router.push({name: "client-list"})
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      // console.log(error)
      alert(error)
    })
  },

  async activateClient (store, client) {

    await ClientApi.activateClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      // console.log(error)
      alert(error)
    })
  },

  async blockClient (store, client) {

    await ClientApi.blockClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      // console.log(error)
      alert(error)
    })
  },

  async deleteClient (store, client) {

    await ClientApi.deleteClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      //  TODO: Handle Error, set to be form or toast
      // console.log(error)
      alert(error)
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