import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import Authorization from '../src/components/Authorization.vue'
import SignIn from '../src/components/SignIn.vue'
import SignUp from '../src/components/SignUp.vue'
import Client from '../src/components/Client.vue'
import NewRepair from '../src/components/NewRepair.vue'
import MyRepairs from '../src/components/MyRepairs.vue'
import Manager from '../src/components/Manager.vue'
import ManagerForUser from '../src/components/ManagerForUser.vue'
import SetRepairType from '../src/components/SetRepairType.vue'
import StartRepair from '../src/components/StartRepair.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', component: Authorization },
    { path: '/sign-in', component: SignIn },
    { path: '/sign-up', component: SignUp },
    {
      path: '/client',
      component: Client,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/client/new-repair', component: NewRepair },
    { path: '/client/my-repairs', component: MyRepairs },
    { path: '/manager', component: Manager },
    { path: '/manager/:clientId', component: ManagerForUser },
    { path: '/set-repair-type/:clientId/:repairId', component: SetRepairType },
    { path: '/start-repair/:clientId/:repairId', component: StartRepair }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router