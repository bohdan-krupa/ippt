<template>
  <div class="container">
      <p>Email</p>
      <input v-model="email" :class="{ red: isBad.email }" type="text">
      <p>Password</p>
      <input v-model="password" :class="{ red: isBad.password }" type="password">
      <div @click="onSignIn" class="sign-btn">Sign up</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        email:    null,
        password: null,
        isBad: {
          email: false,
          password: false
        }
      }
    },
    methods: {
      onSignIn() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          this.$router.push('/')
        }).catch(error => {
          this.isBad.email = true
          this.isBad.password = true

          alert(error.message)
        })
      }
    }
  }
</script>

<style lang="sass">  
  .red
    border-color: red
</style>