<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawerRight"
        app
        clipped
        right
    ></v-navigation-drawer>

    <v-app-bar
        app
        clipped-right
        color="blue-grey"
        dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list dense>

      </v-list>
    </v-navigation-drawer>


    <v-main>
      <v-container
          class="fill-height"
          fluid
      >
        <comp-chat-template />
      </v-container>
    </v-main>

    <v-navigation-drawer
        fixed
        right
        temporary
    ></v-navigation-drawer>

    <v-footer
        app
        color="blue-grey"
        class="white--text"
    >
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

import CompChatTemplate from "@/components/CompChatTemplate";


export default {
  name: 'Home',


  props: {
    //
  },


  components: {
    CompChatTemplate
  },


  data: () => ({
    drawer: null,
    drawerRight: null,
    left: false,
  }),

  methods: {

    async sendMessage() {
      await this.$axios.post('api/messages', {
        message: this.inputMessage,
      })
        .then((response) => {
            console.log(response)
          })
        .catch((error) => {
          console.log(error)
        });
      this.inputMessage = null;
    }

  }
}
</script>