import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listUser: null,
    currentUserId: localStorage.getItem('userId'),
    messagesFromAPIServer: [],
    userIdReceiveMessage: null,
    messageFromPusher: null,
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
    },

    setFirstUserInListUser(state, {firstUserInListUser}) {
      state.userIdReceiveMessage = firstUserInListUser.id;
    }

  },
  actions: {


    setListUser({state, commit}, {userList}) {
      let firstUserInListUser = userList[0];
      commit('setListUser', {userList});
      commit('setFirstUserInListUser', {firstUserInListUser});
    },

    axiosApiMessage({state, commit}, {userIdReceiveMessage}) {
      axios.get('api/messages', {headers: {'toUserId': userIdReceiveMessage}})
          .then(({data}) => {
            commit('setMessagesFromAPIServer', {data})
          })
          .catch((error) => {
            //
          });
    }


  },
  modules: {
  }
})
