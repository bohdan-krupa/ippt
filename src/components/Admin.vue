<template>
  <p>Managers:</p>
  <p v-for="manager in managers">{{ manager }}</p>
  <p>Users:</p>
  <p v-for="user in users">{{ user }}</p>
</template>

<script>
  import firebase from 'firebase'

  export default {
    
  }
</script>