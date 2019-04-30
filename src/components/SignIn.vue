<template>
  <div class="container">
    <form>
      <p>Email</p>
      <input v-model="email" type="text">
      <p>Password</p>
      <input v-model="password" type="password">
      <div @click="onSignIn" class="sign-btn">Sign in</div>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import toast from '../toast.js'

  export default {
    data() {
      return {
        email:    null,
        password: null
      }
    },
    mixins: [toast],
    methods: {
      onSignIn() {
        if (this.email && this.password.length > 5) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
            this.success('You are logged in')
            this.$router.replace('/client')
          },
          error => {
            this.error(error.message)
          })
        }
      }
    }
  }
</script>