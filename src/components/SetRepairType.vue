<template>
  <div>
    <div class="container">
      <p>Machine:</p>
      <h4>{{ machineType.country }}</h4>
      <h4>{{ machineType.year }}</h4>
      <h4>{{ machineType.mark }}</h4>
      <hr>
      <p>* Repair name:</p>
      <input v-model="repairType.name" type="text">
      <p>* Duration (days):</p>
      <input v-model="repairType.duration" type="number">
      <p>* Price ($):</p>
      <input v-model="repairType.price" type="number">
      <p>Notes:</p>
      <input v-model="repairType.notes" type="text">
      <div @click="onSetRepairType" class="sign-btn">Done</div>
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
        machineType: {
          country: null,
          year:    null,
          mark:    null
        },
        repairType: {
          name:     null,
          duration: null,
          price:    null,
          notes:    null
        }
      }
    },
    created() {
      this.clientId = this.$route.params.clientId
      this.repairId = this.$route.params.repairId

      let dbRef = 'clients/' + this.clientId + '/repaires/' + this.repairId + '/machineType'
      firebase.database().ref(dbRef).once('value', snap => {
        this.machineType = snap.val()
      })
    },
    methods: {
      onSetRepairType() {
        if (this.repairType.name && this.repairType.duration && this.repairType.price) {
          this.success('Loading...')

          let dbRef = 'clients/' + this.clientId + '/repaires/' + this.repairId + '/repairType'
          this.$route.replace('/manager/')
          
          firebase.database().ref(dbRef).set(
            this.repairType
          ).then(() => {
            this.success('Done')
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