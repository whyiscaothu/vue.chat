<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),


  beforeCreate() {
    this.$axios.get('api/user')
        .then(({data}) => {
          localStorage.setItem('userId', data.id);
        })
        .catch(error => {
          //
        });
  }
};
</script>
