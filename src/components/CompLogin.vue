<template>
  <v-app id="inspire">
    <v-main>
      <v-container
          class="fill-height"
          fluid
      >
        <v-row
            align="center"
            justify="center"
        >
          <v-col
              cols="12"
              sm="8"
              md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                  color="primary"
                  dark
                  flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      v-model="email"
                      label="Email"
                      prepend-icon="mdi-account"
                      type="text"
                  ></v-text-field>

                  <v-text-field
                      v-model="password"
                      id="password"
                      label="Password"
                      prepend-icon="mdi-lock"
                      type="password"
                  ></v-text-field>
                  <div class="col-12 pa-0 d-flex">
                    <v-checkbox
                        v-model="isRememberMe"
                        class="ma-0"
                        label="Remember Me"
                    >
                    </v-checkbox>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="px-8"
                    color="primary"
                    @click="login"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'CompLogin',

  data() {
    return {
      email: null,
      password: null,
      isRememberMe: false,
    }
  },

  methods: {

    login: function () {
      this.$axios.post('api/login', {
        email: this.email,
        password: this.password,
      })
          .then(function ({data}) {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('token_type', data.token_type);
          })
          .catch(function (error) {
            //
          });

    }

  },


  props: {
    //
  },
}
</script>