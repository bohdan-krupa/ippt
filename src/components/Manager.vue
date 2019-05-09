<template>
  <div class="container">
    <h4>Клієнти:</h4>
    <router-link
      v-for="(client, index) in clients"
      :to="'/manager/' + client.id"
      :key="index"
      class="sign-btn"
    >{{ client.email }}</router-link>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import toast from '../toast.js'

  export default {
    data() {
      return {
        clients: []
      }
    },
    created() {
      this.warn('Завантаження...')

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
        this.success('Готово')
      })
    },
    mixins: [toast]
  }
</script>