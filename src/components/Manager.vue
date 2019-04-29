<template>
  <div class="container">
    <p>Users:</p>
    <p v-for="(user, index) in users" :key="index">{{ user.email }}</p>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        users: []
      }
    },
    created() {
      firebase.database().ref('users').once('value', snap => {
        let users = snap.val()
        let currentData = []

        for (let user in users) {
          currentData.push({
            'id': user,
            'email': users[user][0]
          })
        }

        this.users = currentData
      })
    }
  }
</script>