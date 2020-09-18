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
      <comp-list-user/>
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

import {mapGetters} from 'vuex';


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


  computed: {
    ...mapGetters([
        'currentUserId'
    ])
  },


  methods: {

    getListUser(userId) {
      this.$axios.get('api/users')
          .then(({data}) => {

            let userList = this.excludeCurrentUserInListUser(data, userId);
            this.$store.dispatch('setListUser', {
              userList
            });

          })
          .catch((error) => {
            //
          });
    },

    excludeCurrentUserInListUser(userList, userId) {
      if (userList.length && typeof userList === 'object') {
        return userList.filter(user => user.id !== userId)
      }
    }

  },

  async created() {
    let userId = null;
    await this.$axios.get('api/user')
        .then(({data}) => {
          userId = data.id;
          localStorage.setItem('userId', userId);
        })
        .catch(error => {
          //
        });
    this.getListUser(userId);

  }
}
</script>