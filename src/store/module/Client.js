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
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async getClientByClientId (store, clientId) {
    await ClientApi.getClientByClientIdApi(clientId).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async createClient (store, {client, router}) {
    await ClientApi.createClientApi( client).then((client) => {
      store.commit('SET_CLIENT', client)

      //  redirect to list of product
      router.push({name: "client-list"})
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async updateClient (store, {client, router}) {

    await ClientApi.updateClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)

      //  redirect to list of product
      router.push({name: "client-list"})
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async activateClient (store, client) {

    await ClientApi.activateClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async blockClient (store, client) {

    await ClientApi.blockClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
    })
  },

  async deleteClient (store, client) {

    await ClientApi.deleteClientApi(client).then((client) => {
      store.commit('SET_CLIENT', client)
    }).catch(error => {
      store.dispatch("Notification/setNotification", error, {root: true})
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