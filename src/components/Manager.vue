<template>
  <div>
    <div class="container">
      <h4>Клієнти:</h4>
      <router-link
        v-for="(client, index) in clients"
        :to="`/manager/${client.id}`"
        :key="index"
        class="sign-btn"
      >{{ client.email }}</router-link>
    </div>
    <SignOut />
  </div>
</template>

<script>
  // Компонент для менеджерської панелі та обробки всіх дій менеджера
  

  import firebase from 'firebase'
  import SignOut from './SignOut.vue'

  export default {
    data() {
      return {
        clients: []
      }
    },
    created() {
      firebase.database().ref('clients').once('value', snap => {
        let clients = snap.val()
        let currentData = []

        for (let client in clients) {
          currentData.push({
            'id': client,
            'email': clients[client].email
          })
        }

        this.clients = currentData
      })
    },
    components: {
      SignOut
    }
  }
</script>