import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listUser: null,
    currentUserId: localStorage.getItem('userId'),
    messagesFromAPIServer: [],
    userIdReceiveMessage: null,
    messageFromPusher: null
  },
  getters: {
    userIdReceiveMessage: state => state.userIdReceiveMessage,
    messagesFromAPIServer: state => state.messagesFromAPIServer,
    currentUserId: state => state.currentUserId,
    listUser: state => state.listUser,
  },
  mutations: {

    setUserIdReceiveMessage(state, {userIdReceiveMessage}) {
      state.userIdReceiveMessage = userIdReceiveMessage;
    },

    setMessagesFromAPIServer(state, {data}) {
      state.messagesFromAPIServer = data;
    },

    pushMessageToMessagesFromAPIServer(state, {message}) {
      state.messagesFromAPIServer.push(message);
    },

    setListUser(state, {userList}) {
      state.listUser = userList;
    }

  },
  actions: {
  },
  modules: {
  }
})
