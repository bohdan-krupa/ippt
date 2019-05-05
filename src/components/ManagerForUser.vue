<template>
  <div>
    <div class="container">
      <h3>User: {{ email }}</h3>
      <h3>Repairs:</h3>
      <div v-for="(repair, index) in repaires" :key="index">
        <hr />
        <p>Status: {{ repair.status }}</p>
        <h4>Machine Type:</h4>
        <p>Country: {{ repair.machineType.country }}</p>
        <p>Year: {{ repair.machineType.year }}</p>
        <p>Mark: {{ repair.machineType.mark }}</p>
        <div v-if="repair.repairType">
          <h4>Repait Type:</h4>
          <p>Repait name: {{ repair.repairType.name }}</p>
          <p>Duration: {{ repair.repairType.duration }} days</p>
          <p>Price: {{ repair.repairType.price }}$</p>
          <p v-if="repair.repairType.notes">Notes: {{ repair.repairType.notes }}</p>
        </div>
        <router-link
          :to="'/set-repair-type/' + $route.params.clientId + '/' + repair.repairId"
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
      this.success('Loading...')
      let clientId = this.$route.params.clientId

      firebase.database().ref('clients/' + clientId).once('value', snap => {
        let data = snap.val()

        this.email = data.email

        for (let repairId in data.repaires) {
          let status
          let repair = data.repaires[repairId]

          if (repair.startDate) {
            let isRepaired = this.dateDiff(
              repair.startDate, repair.repairType.duration
            )
            status = isRepaired ? 'Repaired' : 'Now being repaired'
          } else if (repair.repairType.isAgreed) {
            status = 'Agreed'
          } else if (repair.repairType) {
            status = 'Waiting for the client\'s agreement'
          } else {
            status = 'Waiting for the repair type'
          }

          this.repaires.push({
            repairId,
            status,
            ...data.repaires[repairId]
          })
        }


        this.success('Done')
      })
    },
    methods: {
      dateDiff(startDate, daysOfRepair) {
        startDate = new Date(startDate)
        let daysAgo = (
          Date.now() - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        ) / (1000 * 60 * 60 * 24)

        return daysAgo > daysOfRepair
      }
    },
    components: {
      BackBtn
    }
  }
</script>