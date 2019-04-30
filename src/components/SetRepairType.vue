<template>
  <div class="container">
    <p>Machine:</p>
    <h4>{{ machine.country }}</h4>
    <h4>{{ machine.year }}</h4>
    <h4>{{ machine.mark }}</h4>

    <p>* Name:</p>
    <input v-model="repair.name" type="text">
    <p>* Duration (days):</p>
    <input v-model="repair.duration" type="number">
    <p>* Price ($):</p>
    <input v-model="repair.price" type="number">
    <p>Notes:</p>
    <input v-model="repair.notes" type="text">
    <div @click="onSetRepairType" class="sign-btn">Готово</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        clientId:  null,
        machineId: null,
        machine: {
          country: null,
          year:    null,
          mark:    null
        },
        repair: {
          name:     null,
          duration: null,
          price:    null,
          notes:    null
        }
      }
    },
    created() {
      this.clientId = this.$route.params.client
      this.machineId = this.$route.params.machine

      let dbRef = firebase.database().ref('clients/' + this.clientId + '/machines/' + this.machineId)
      
      dbRef.once('value', snap => {
        this.machine = snap.val()
      })
    },
    methods: {
      onSetRepairType() {
        if (this.repair.name && this.repair.duration && this.repair.price) {
          firebase.database().ref('clients/' + this.clientId + '/repairs').push().set({
            name:     this.repair.name,
            duration: this.repair.duration,
            price:    this.repair.price,
            notes:    this.repair.notes
          }).then(() => {
            this.success('Done')
          },
          error => {
            this.error(error.message)
          })
        }
      }
    }
  }
</script>