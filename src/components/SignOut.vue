<template>
  <div @click="onSignOut" id="right-bottom-btn">Вийти</div>
</template>

<script>
  // Компонент для виходу

  import firebase from 'firebase'

  export default {
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