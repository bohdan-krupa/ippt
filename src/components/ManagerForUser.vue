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
      let id = this.$route.params.id
      
      firebase.database().ref('clients' + id).once('value', snap => {
        let data = snap.val()

        this.machines = data.repairs
        this.email = data.email
      })
    }
  }
</script>