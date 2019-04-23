<template>
  <div>
    <div class="container">
      <h3>{{ name }}</h3>
      <div class="sign-btn">Ask for repair</div>
    </div>
    <div @click="onSignOut" class="sign-out-btn">Sign out</div>
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
          this.name = user.email
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
  .sign-out-btn
    position: absolute
    left: 25px
    bottom: 25px
    width: 140px
    height: 40px
    background-color: lightblue
    text-align: center
    line-height: 40px
    border-radius: 20px
    cursor: pointer
</style>