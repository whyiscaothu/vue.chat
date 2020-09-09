import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objMessageFromPusher: null,
  },
  getters: {
  },
  mutations: {
    recieveMessageFromPusher(state, {objMessage}) {
      state.objMessageFromPusher = objMessage
    }
  },
  actions: {
  },
  modules: {
  }
})
