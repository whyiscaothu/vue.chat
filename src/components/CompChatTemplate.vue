<template>
  <div class="col-12 align-self-end pa-0" v-show="userIdReceiveMessage">

    <div
        class="col-12 d-flex"
        :class="{'justify-end': isOwner(message)}"
        v-for="(message, index) in messagesFromAPIServer"
    >
      <div
          class="pa-2 rounded text-justify" style="width: 80%"
          :class="{info: isOwner(message), 'grey lighten-2': isNotOwner(message)}"
      >
        {{ message.message }}
      </div>
    </div>
    <div class="col-12 d-flex align-center justify-space-between">
      <v-textarea
          v-model="inputMessage"
          class="mt-4 d-flex col-11"
          label="Two rows"
          auto-grow
          outlined
          rows="2"
          row-height="25"
          rounded
      >
      </v-textarea>
      <v-btn
          icon
          color="success"
          @click="sendMessage"
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "CompChatTemplate",


  data: () => ({
    inputMessage: null,
    authenticatedUserId: +localStorage.getItem('userId') || null,
  }),

  computed: {
    ...mapGetters([
        'userIdReceiveMessage',
        'messagesFromAPIServer',
    ])
  },

  methods: {

    async sendMessage() {

      this.messagesFromAPIServer.push({
        user_id: this.authenticatedUserId,
        to_user_id: this.userIdReceiveMessage,
        message: this.inputMessage,
      })

      this.$axios.post('api/messages', {
        message: this.inputMessage,
        toUserId: this.userIdReceiveMessage
      })
          .then((response) => {
            //
          })
          .catch((error) => {
            //
          });
      this.inputMessage = null;
    },

    isOwner(message) {
      return message.user_id === this.authenticatedUserId;
    },
    isNotOwner(message) {
      return message.user_id !== this.authenticatedUserId;
    }

  },


  created() {
    //
  },


  mounted() {

    this.$echo.private(`chat.${this.authenticatedUserId}`)
        .listen('ChatEvent', ({message}) => {
          this.$store.commit('pushMessageToMessagesFromAPIServer', {
            message
          });
        });
  }

}
</script>

<style scoped>

</style>