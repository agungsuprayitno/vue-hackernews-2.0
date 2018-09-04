const state  = () => ({
  pagination: {
    currentPage: 1,
    size: 10,
    totalRows: 0
  }
})

const getters = {

}

const actions = {
  async setPagination ({commit}, pagination) {
    commit('SET_PAGINATION', pagination)
  }
}

const mutations = {
  'SET_PAGINATION' (state, pagination) {
    state.pagination = pagination
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}