<template>
  <div class="container">
<!--     <p>Machine:</p>
    <h4>{{ machine.country }}</h4>
    <h4>{{ machine.year }}</h4>
    <h4>{{ machine.mark }}</h4> -->

    <p>{{ repair }}</p>
<!--     <input v-model="country" type="text">
    <p>Рік випуску</p>
    <input v-model="year" type="number" min="1980">
    <p>Марка</p>
    <input v-model="mark" type="text">
    <div @click="onDone" class="sign-btn">Готово</div> -->
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        repair: 'sdfg'
      }
    },
    created() {
      let client = this.$route.params.client
      let machine = this.$route.params.machine

      firebase.database().ref('clients/' + client + '/repairs/' + machine).once('value', snap => {
        console.log(snap.val())
      })
    }
  }
</script>