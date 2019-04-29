<template>
  <div class="container">
    <p>Clients:</p>
    <p v-for="(client, index) in clients" :key="index" class="sign-btn">{{ client.email }}</p>
  </div>
</template>

<script>
  import firebase from 'firebase'

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
            'email': clients[client][0]
          })
        }

        this.clients = currentData
      })
    }
  }
</script>