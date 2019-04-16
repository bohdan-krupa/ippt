import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Authorization from '../src/components/Authorization.vue'
import SignIn from '../src/components/SignIn.vue'
import SignUp from '../src/components/SignUp.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Authorization },
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: SignUp }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
