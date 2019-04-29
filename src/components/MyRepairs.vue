<template>
  <div>
    <div class="container">
      <div v-for="(machine, index) in machines" :key="index">
        <p>Machine:</p>
        <h4>{{ machine.country }}</h4>
        <h4>{{ machine.year }}</h4>
        <h4>{{ machine.mark }}</h4>
      </div>
    </div>
    <div @click="onBack" class="bottom-right-btn">Back</div>
  </div>
</template>

<script>
  import firebase from 'firebase'
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
          
          for (machine in data) {
            machines.push(data[machine])
          }
          this.machines = machines
          
          this.success('Done')
        })
      })
    },
    methods: {
      onBack() {
        this.$router.go(-1)
      }
    }
  }
</script>