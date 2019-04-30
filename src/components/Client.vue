<template>
  <div>
    <div class="container">
      <router-link to="/client/new-repair" class="sign-btn">Ask for repair</router-link>
      <router-link to="/client/my-repairs" class="sign-btn">My tasks</router-link>
    </div>
    <div @click="onSignOut" id="right-bottom-btn">Sign out</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        
      }
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