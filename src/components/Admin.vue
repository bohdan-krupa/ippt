<template>
  <div>
    <div class="container">
      <h4>Менеджери:</h4>
      <div v-if="isManagers">
        <div v-for="(manager, index) in managers" :key="index">
          <p>{{ manager.email }}</p>
          <div @click="onDeleteManager(manager.id)" class="admin-btn">Зняти менеджера</div>
        </div>
      </div>
      <p v-else>Немає менеджерів, назначте когось!</p>
      <div v-if="!needForm" @click="needForm = true" class="sign-btn">Назначити</div>
      <Form v-else @onGetData="addManager" btn-text="Назначити менеджера" class="container" />
    </div>
    <Manager />
  </div>
</template>

<script>
  // Компонент для адмінської панелі та обробки всіх дій адміна

  import firebase from 'firebase'
  import Form from './Form.vue'
  import Manager from './Manager.vue'

  let config = {
    apiKey: "AIzaSyC4U1gX8DoZGmywRO2KP4iZDtmeVuGWZ28",
    authDomain: "machines-5bc18.firebaseapp.com",
    databaseURL: "https://machines-5bc18.firebaseio.com",
    projectId: "machines-5bc18",
    storageBucket: "machines-5bc18.appspot.com",
    messagingSenderId: "1081596877438"
  }
  let firebase2 = firebase.initializeApp(config, 'Secondary')

  export default {
    data() {
      return {
        managers:   [],
        isManagers: true,
        needForm:   false
      }
    },
    created() {
      firebase.database().ref('managers').on('value', snap => {
        const managers = snap.val()

        if (!managers) {
          this.isManagers = false
        } else {
          this.isManagers = true
          this.managers = []

          for (let managerId in managers) {
            this.managers.push({ email: managers[managerId], id: managerId })
          }
        }
      })
    },
    methods: {
      onDeleteManager(id) {
        firebase.database().ref(`managers/${id}`).remove()
      },
      addManager(data) {
        firebase2.auth().createUserWithEmailAndPassword(data.email, data.password).then(user => {
          let managerObj = {}
          managerObj[user.uid] = data.email

          firebase.database().ref('managers').update(
            managerObj
          ).then(() => {
            this.success(`${data.email} тепер менеджер`)
          },
          error => {
            this.error(error.message)
          })
        },
        error => {
          this.error(error.message)
        })
      }
    },
    components: {
      Form,
      Manager
    }
  }
</script>

<style lang="sass" scoped>
  p
    display: inline-block

  .admin-btn
    display: inline-block
    margin-left: 15px
    padding: 10px 12px
    background: lightblue
    border-radius: 10px
    cursor: pointer
</style>