<template>
  <div>
    <div class="container">
      <div v-for="(machine, index) in machines" :key="index">
        <h4>Machine:</h4>
        <p>Country: {{ machine.country }}</p>
        <p>Year: {{ machine.year }}</p>
        <p>Mark: {{ machine.mark }}</p>
        <p>Status: {{ getStatus(machine) }}</p>
        <div v-if="machine.repair">
          <p>Repair name: {{ machine.repair.name }}</p>
          <p>Duration: {{ machine.repair.duration }} days</p>
          <p>Price: {{ machine.repair.price }}$</p>
          <p v-if="machine.repair.notes">Notes: {{ machine.repair.notes }}</p>
          <div class="sign-btn">Agree</div>
        </div>
        <hr />
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
          machines: []
      }
    },
    mixins: [toast],
    created() {
      this.success('Loading...')

      firebase.auth().onAuthStateChanged(user => {
        firebase.database().ref('clients/' + user.uid + '/machines').once('value', snap => {
          let data = snap.val()
          let machines = []
          
          for (let machine in data) {
            machines.push(data[machine])
          }
          this.machines = machines
          
          this.success('Done')
        })
      })
    },
    methods: {
      getStatus(machine) {
        return !machine.repair ? 'Waiting for the manager' : 'Processed'
      }
    },
    components: {
      BackBtn
    }
  }
</script>