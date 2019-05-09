<template>
  <div>
    <div class="container">
      <p>Дата початку: {{ date }}</p>
      <p>Примітки:</p>
      <input v-model="notes" type="text">
      <div @click="onStartRepair" class="sign-btn">Почати ремонт</div>
    </div>
    <BackBtn />
  </div>
</template>

<script>
  import firebase from 'firebase'
  import BackBtn from './BackBtn.vue'

  export default {
    data() {
      return {
        clientId: null,
        repairId: null,

        date:     null,
        notes:    null
      }
    },
    created() {
      this.clientId = this.$route.params.clientId
      this.repairId = this.$route.params.repairId

      let date = new Date()
      date = date.toISOString()
      date = date.split('T')[0]
      date = date.replace(/-/g, '.')

      this.date = date

      let dbRef = 'clients/' + this.clientId + '/repaires/' + this.repairId + '/machineType'
      firebase.database().ref(dbRef).once('value', snap => {
        this.machineType = snap.val()
      })
    },
    methods: {
      onStartRepair() {
        this.success('Loading...')

        let dbRef = `clients/${this.clientId}/repaires/${this.repairId}`
        
        firebase.database().ref(`${dbRef}/startDate`).set(
          this.date
        ).then(() => {
          if (this.notes) {
            firebase.database().ref(`${dbRef}/notes`).set(
              this.notes
            ).then(() => {
              this.success('Ремонт почато')
            },
            error => {
              this.error(error.message)
            })
          } else {
            this.success('Ремонт почато')
          }
        },
        error => {
          this.error(error.message)
        })
      }
    },
    components: {
      BackBtn
    }
  }
</script>