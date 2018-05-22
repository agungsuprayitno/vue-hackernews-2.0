import Vue from 'vue'
const parseString = require('xml2js').parseString
export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  },

  SET_PROMO: (state, promo) => {
    console.log(promo)
    parseString(promo, function (err, result) {
      console.log(result)
      state.promo = result
    })
  }
}
