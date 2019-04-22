import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Authorization from '../src/components/Authorization.vue'
import SignIn from '../src/components/SignIn.vue'
import SignUp from '../src/components/SignUp.vue'
import Client from '../src/components/Client.vue'
import firebase from 'firebase'

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
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Authorization },
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: SignUp },
  { path: '/client', component: Client }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
