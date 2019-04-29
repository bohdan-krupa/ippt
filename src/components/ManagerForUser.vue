<template>
  <div class="container">
    <p>User: {{ email }}</p>
    <p>Repairs:</p>
    <div v-for="(machine, index) in machines" :key="index">
      <p>Machine:</p>
      <h4>{{ machine.country }}</h4>
      <h4>{{ machine.year }}</h4>
      <h4>{{ machine.mark }}</h4>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        machines: [],
        email:    null
      }
    },
    created() {
      firebase.database().ref('clients').once('value', snap => {
        let id = this.$route.params.id
        let data = snap.val()[id]
        
        this.machines = data.repairs
        this.email = data.email
      })
    }
  }
</script>