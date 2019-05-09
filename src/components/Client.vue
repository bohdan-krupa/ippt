<template>
  <div>
    <div class="container">
      <p></p>
      <router-link to="/client/new-repair" class="sign-btn">Звернутись за ремонтом</router-link>
      <router-link to="/client/my-repairs" class="sign-btn">Мої ремонти</router-link>
    </div>
    <div @click="onSignOut" id="right-bottom-btn">Вийти</div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import toast from '../toast.js'

  export default {
    mixins: [toast],
    methods: {
      onSignOut() {
        firebase.auth().signOut().then(() => {
          this.success('Ви успішно вийшли')

          this.$router.replace('/')
        },
        error => {
          this.error(error.message)
        })
      }
    }
  }
</script>