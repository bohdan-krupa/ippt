<template>
  <div class="container">
    <h3>User: {{ email }}</h3>
    <p>Repairs:</p>
    <div v-for="(machine, index) in machines" :key="index">
      <p>Machine:</p>
      <h4>{{ machine.country }}</h4>
      <h4>{{ machine.year }}</h4>
      <h4>{{ machine.mark }}</h4>
      <router-link :to="'/set-repair-type/'" class="sign-btn">Set repair type</router-link>
      <!-- <router-link :to="" class="sign-btn">To repair</router-link> -->
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

        for (let machine in data.machines) {
          console.log(data.machines[machine])
        }

        this.machines = data.machines
        this.email = data.email
      })
    }
  }
</script>