import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messagesFromAPIServer: null,
    userIdReceiveMessage: null,
  },
  getters: {
    userIdReceiveMessage: state => state.userIdReceiveMessage,
    messagesFromAPIServer: state => state.messagesFromAPIServer,
  },
  mutations: {

    setUserIdReceiveMessage(state, {userIdReceiveMessage}) {
      state.userIdReceiveMessage = userIdReceiveMessage;
    },

    setMessagesFromAPIServer(state, {data}) {
      state.messagesFromAPIServer = data;
    }

  },
  actions: {
  },
  modules: {
  }
})
