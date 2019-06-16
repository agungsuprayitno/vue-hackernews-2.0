const state  = () => ({
  notification: {},
  notificationType: ''
})

const getters = {

}

const actions = {
  async setNotification (store, notification) {
    await store.dispatch("setNotificationType", notification.Status)
    await store.commit('SET_NOTIFICATION', notification)
  },

  async setNotificationType ({commit}, status) {
    let type = ''

    if(status <= 200) {
      type = 'success'
    }else if(status > 200 && status < 400) {
      type = 'success'
    } else if(status >= 400) {
      type = 'danger'
    }

    await commit('SET_NOTIFICATION_TYPE', type)
  },

  async removeNotification ({commit}) {
    await commit('SET_NOTIFICATION', {})
    await commit('SET_NOTIFICATION_TYPE', '')
  }
}

const mutations = {
  'SET_NOTIFICATION' (state, notification) {
    state.notification = notification
  },
  'SET_NOTIFICATION_TYPE' (state, notificationType) {
    state.notificationType = notificationType
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}