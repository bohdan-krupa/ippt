<template>
  <div>
    <div class="container">
      <h3>{{ name }}</h3>
    </div>
    <div @click="onSignOut" class="sign-btn">Sign out</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        name: null
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.name = user.emailVerified
        } else {
          this.$router.replace('/')
        }
      })
    },
    methods: {
      onSignOut() {
        firebase.auth().signOut().then(() => {
         this.$notify({
            title: 'You are logged out',
            type: 'success'
          })

          this.$router.replace('/')
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
</script>

<style lang="sass">
  .sign-btn
    position: relative
    bottom: 0
    left: 0
</style>