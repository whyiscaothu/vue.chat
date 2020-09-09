import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Echo from 'laravel-echo'
import pusher from 'pusher-js';

const APP_KEY = 'e4c54b1db90f81f1699f';
const APP_CLUSTER = 'ap1';

Vue.config.productionTip = false

window.pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
});

let echo = new Echo({
  broadcaster: 'pusher',
  key: APP_KEY,
  cluster: APP_CLUSTER,
  // forceTLS: true,
  // client: pusher
});

Vue.prototype.$echo = echo;


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
