import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorization from '../src/components/Authorization.vue'
import SignIn from '../src/components/SignIn.vue'
import SignUp from '../src/components/SignUp.vue'
import Client from '../src/components/Client.vue'
import NewRepair from '../src/components/NewRapair.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Authorization },
    { path: '/sign-in', component: SignIn },
    { path: '/sign-up', component: SignUp },
    { path: '/client', component: Client },
    { path: '/client/new-repair', component: NewRepair }
  ]
})