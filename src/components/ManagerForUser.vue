<template>
  <div>
    <div class="container">
      <h3>User: {{ email }}</h3>
      <h3>Repairs:</h3>
      <div v-for="(machine, index) in repaires" :key="index">
        <hr />
        <h4>Machine:</h4>
        <p>Country: {{ machine.country }}</p>
        <p>Year: {{ machine.year }}</p>
        <p>Mark: {{ machine.mark }}</p>
        <p>Status: {{ machine.status }}</p>
        <div v-if="machine.repair">
          <p>Repait name: {{ machine.repair.name }}</p>
          <p>Duration: {{ machine.repair.duration }} days</p>
          <p>Price: {{ machine.repair.price }}$</p>
          <p v-if="machine.repair.notes">Notes: {{ machine.repair.notes }}</p>
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
        repaires: [],
        email:    null
      }
    },
    mixins: [toast],
    created() {
      this.dateDiff('2019.05.02', 1)
      this.success('Loading...')
      let clientId = this.$route.params.clientId

      firebase.database().ref('clients/' + clientId).once('value', snap => {
        let data = snap.val()

        this.email = data.email
        // DONE!

        for (let repairId in data.repaires) {
          let status

          if (data.repaires[repairId].startDate) {
            // if (dateDiff('02.04.2019', 1)) {}
          }

          if (data.repaires[repairId].repair) {
            status = 'Waiting for the client\'s agreement'
          } else {
            status = 'Waiting for the manager'
          }
          this.repaires.push({
            id:      repairId,
            country: data.repaires[repairId].country,
            year:    data.repaires[repairId].year,
            mark:    data.repaires[repairId].mark,
            repair:  data.repaires[repairId].repair,
            status
          })
        }
      })
    },
    methods: {
      dateDiff(startDate, daysOfRepair) {
        let date1 = new Date(startDate)
        console.log(
          (Date.now() -
          Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) / (1000 * 60 * 60 * 24)
        )
      }
    },
    components: {
      BackBtn
    }
  }
</script>