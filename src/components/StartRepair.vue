<template>
  <div>
    <div class="container">
      <p>Дата початку: {{ date }}</p>
      <!-- <input type="text" disabled> -->
      <!-- <p>2019.05.09</p> -->
      <p>Примітки:</p>
      <input v-model="notes" type="text">
      <div @click="onSetRepairType" class="sign-btn">Готово</div>
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

      // let date = new Date()
      // let year = date.getFullYear()
      // let month = date.getMonth();
      // let day = date.getDay()
      // this.date = `${year}.${month}.${day}`

      this.date = (new Date()).toISOString().replace(/-/g, '.').split('T')[0]

      let dbRef = 'clients/' + this.clientId + '/repaires/' + this.repairId + '/machineType'
      firebase.database().ref(dbRef).once('value', snap => {
        this.machineType = snap.val()
      })
    },
    methods: {
      onSetRepairType() {
        if (this.repairType.name && this.repairType.duration && this.repairType.price) {
          this.success('Loading...')

          let dbRef = 'clients/' + this.clientId + '/repaires/' + this.repairId
          
          firebase.database().ref(dbRef + '/repairType').set(
            this.repairType
          ).then(() => {
            firebase.database().ref(dbRef + '/status').set(
              'Waiting for the client\'s agreement'
            ).then(() => {
              this.$router.replace('/manager/' + this.clientId)
            },
            error => {
              this.error(error.message)
            })
          },
          error => {
            this.error(error.message)
          })
        } else {
          this.error('Incorrect data')
        }
      }
    },
    components: {
      BackBtn
    }
  }
</script>