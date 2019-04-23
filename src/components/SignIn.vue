<template>
  <div class="container">
      <p>Email</p>
      <input v-model="email" type="text">
      <p>Password</p>
      <input v-model="password" type="password">
      <div @click="onSignIn" class="sign-btn">Sign in</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        email:    null,
        password: null
      }
    },
    methods: {
      onSignIn() {
        if (this.email && this.password.length > 5) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
            this.$notify({
              title: 'You are logged in',
              type: 'success'
            })
            this.$router.push('/client')
          },
          error => {
            this.$notify({
              title: error.message,
              type: 'error'
            })
          })
        }
      }
    }
  }
</script>