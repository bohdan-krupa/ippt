<template>
  <div class="container">
    <h3>{{ name }}</h3>
    <div @click="onSignOut" class="sign-btn">Sign out</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        name: 'none'
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.name = user.email
        } else {
          this.$router.push('/')
        }
      })
    },
    methods: {
      onSignOut() {
        firebase.auth().signOut().then(() => {
          alert("Outed")
          this.$router.push('/')
        }).catch(error => {
          alert(error.message)
        })
      }
    }
  }
</script>