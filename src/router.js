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
    { path: '/client', component: Client, meta: { toClient: true } },
    { path: '/client/new-repair', component: NewRepair, meta: { toClient: true } },
    { path: '/client/my-repairs', component: MyRepairs, meta: { toClient: true } },
    { path: '/manager', component: Manager, meta: { toManager: true } },
    { path: '/manager/:clientId', component: ManagerForUser, meta: { toManager: true } },
    { path: '/set-repair-type/:clientId/:repairId', component: SetRepairType, meta: { toManager: true } },
    { path: '/start-repair/:clientId/:repairId', component: StartRepair, meta: { toManager: true } }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const toClient = to.matched.some(record => record.meta.toClient)
  const toManager = to.matched.some(record => record.meta.toManager)

  if (currentUser) {
      firebase.database().ref(`managers/${currentUser.uid}`).once('value', snap => {
      const isManager = snap.val()
      console.log(isManager, toManager)

      if ((isManager && toManager) || (!isManager && toClient)) {
        next()
      } else if (isManager && toClient) {
        next('/manager')
      } else if (!isManager && toManager) {
        next('/client')
      }
    })
  }


  // if (!currentUser) {
  //   next('/')
  // } else {
  //   next()
  // }
})

export default router