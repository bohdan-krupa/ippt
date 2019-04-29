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
        let users = []
        for (let user in snap.val()) {
          for (let test in snap.val()[user]) {
            console.log(test)
          }
        }
      })
    }
  }
</script>