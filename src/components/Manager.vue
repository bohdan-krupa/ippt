<template>
  <div class="container">
    <p>Users:</p>
    <p v-for="(user, index) in users" :key="index">{{ user }}</p>
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
        for (let user in users) {
          for (let test in users.user) {
            console.log(test)
          }
        }
      })
    }
  }
</script>