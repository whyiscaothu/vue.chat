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
        width="350"
        app
    >
      <comp-list-user
        :listUser="listUser"
      />
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
import CompListUser from "@/components/CompListUser";


export default {
  name: 'Home',


  props: {
    //
  },


  components: {
    CompChatTemplate,
    CompListUser
  },


  data: () => ({
    drawer: null,
    drawerRight: null,
    left: false,
    listUser: null
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
    },

    getListUser() {
      this.$axios.get('api/users')
          .then(({data}) => {
            this.listUser = data;
          })
          .catch((error) => {
            //
          });
    }

  },

  created() {
    this.getListUser();
  }
}
</script>