import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorization from '../src/components/Authorization.vue'
import SignIn from '../src/components/SignIn.vue'
import SignUp from '../src/components/SignUp.vue'
import Client from '../src/components/Client.vue'
import NewRepair from '../src/components/NewRepair.vue'
import MyRepairs from '../src/components/MyRepairs.vue'
import Manager from '../src/components/Manager.vue'
import ManagerForUser from '../src/components/ManagerForUser.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Authorization },
    { path: '/sign-in', component: SignIn },
    { path: '/sign-up', component: SignUp },
    { path: '/client', component: Client },
    { path: '/client/new-repair', component: NewRepair },
    { path: '/client/my-repairs', component: MyRepairs },
    { path: '/manager', component: Manager },
    { path: '/manager/:id', component: ManagerForUser }
  ]
})