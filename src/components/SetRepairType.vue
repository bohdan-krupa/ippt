<template>
  <div class="container">
    <p>Machine:</p>
    <h4>{{ machine.country }}</h4>
    <h4>{{ machine.year }}</h4>
    <h4>{{ machine.mark }}</h4>

    <p>Name:</p>
    <input v-model="repair.name" type="text">
    <p>Duration (days):</p>
    <input v-model="repair.duration" type="number">
    <p>Price ($):</p>
    <input v-model="repair.price" type="number">
    <p>Notes:</p>
    <textarea v-model="repair.notes"></textarea>
    <div @click="onDone" class="sign-btn">Готово</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
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
      let client = this.$route.params.client
      let machine = this.$route.params.machine

      firebase.database().ref('clients/' + client + '/repairs/' + machine).once('value', snap => {
        this.machine = snap.val()
      })
    }
  }
</script>