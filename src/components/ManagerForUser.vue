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
      let client = this.$route.params.client
      
      firebase.database().ref('clients/' + client).once('value', snap => {
        let data = snap.val()

        this.machines = data.machines
        this.email = data.email
      })
    }
  }
</script>