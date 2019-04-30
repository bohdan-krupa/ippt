<template>
  <div>
    <div class="container">
      <h3>User: {{ email }}</h3>
      <h3>Repairs:</h3>
      <div v-for="(machine, index) in machines" :key="index">
        <hr />
        <h4>Machine:</h4>
        <p>{{ machine.country }}</p>
        <p>{{ machine.year }}</p>
        <p>{{ machine.mark }}</p>
        <div v-if="machine.repair">
          sfg
        </div>
        <router-link
          :to="'/set-repair-type/' + $route.params.client + '/' + machine.id"
          class="sign-btn"
        >Set repair type</router-link>
        <!-- <router-link :to="" class="sign-btn">To repair</router-link> -->
      </div>
    </div>
    <BackBtn />
  </div>
</template>

<script>
  import firebase from 'firebase'
  import BackBtn from './BackBtn.vue'
  import toast from '../toast.js'

  export default {
    data() {
      return {
        machines: [],
        email:    null
      }
    },
    mixins: [toast],
    created() {
      this.success('Loading...')
      let client = this.$route.params.client
      
      firebase.database().ref('clients/' + client).once('value', snap => {
        let data = snap.val()

        this.email = data.email
        this.machines = []

        for (let machine in data.machines) {
          let status
          if (data.machines[machine].repair) {
            status = 'Waiting for the client\'s agreement'
          } else {
            status = 'Waiting for the manager'
          }
          this.machines.push({
            id:      machine,
            country: data.machines[machine].country,
            year:    data.machines[machine].year,
            mark:    data.machines[machine].mark,
            repair:  data.machines[machine].repair,
            status
          })
        }
      })
    },
    components: {
      BackBtn
    }
  }
</script>