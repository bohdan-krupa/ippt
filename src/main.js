// Головний файл для ініціалізації Firebase і Vue

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import Notifications from 'vue-notification'

Vue.use(Notifications)

let config = {
  apiKey: "AIzaSyC4U1gX8DoZGmywRO2KP4iZDtmeVuGWZ28",
  authDomain: "machines-5bc18.firebaseapp.com",
  databaseURL: "https://machines-5bc18.firebaseio.com",
  projectId: "machines-5bc18",
  storageBucket: "machines-5bc18.appspot.com",
  messagingSenderId: "1081596877438"
}
firebase.initializeApp(config)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')