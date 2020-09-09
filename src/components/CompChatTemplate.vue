<template>
  <div class="col-12 align-self-end pa-0">
    <div class="col-12 d-flex" :class="{'justify-end': message.user_id === authenticatedUser}" v-for="(message, index) in messages">
      <div class="info pa-2 rounded">{{ message.message }}</div>
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
export default {
  name: "CompChatTemplate",


  data: () => ({
    messages: null,
    inputMessage: null,
    authenticatedUser: +localStorage.getItem('userId') || null,
    // pusherChannel: window.pusher.subscribe('chat'),
  }),


  methods: {

    async sendMessage() {

      this.messages.push({
        user_id: this.authenticatedUser,
        to_user_id: 5,
        message: this.inputMessage,
      })

      await this.$axios.post('api/messages', {
        message: this.inputMessage,
      })
          .then((response) => {
            //
          })
          .catch((error) => {
            //
          });
      this.inputMessage = null;
    }

  },


  created() {
    this.$axios.get('api/messages')
      .then(({data}) => {
        this.messages = data;
      })
      .catch((error) => {
        //
      });
  },


  mounted() {
    // this.pusherChannel.bind('App\\Events\\ChatEvent', function(data) {
    //   console.log('pusher',data);
    // });

    this.$echo.channel('chat')
        .listen('ChatEvent', (data) => {
          console.log('pusher',data);
        });
  }

}
</script>

<style scoped>

</style>