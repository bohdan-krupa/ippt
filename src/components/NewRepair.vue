<template>
  <div>
    <div class="container">
      <p>Країна-виробник</p>
      <input v-model="country" type="text">
      <p>Рік випуску</p>
      <input v-model="year" type="number" min="1980">
      <p>Марка</p>
      <input v-model="mark" type="text">
      <div @click="onDone" class="sign-btn">Готово</div>
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
        uId:     null,
        email:   null,

        country: null,
        year:    null,
        mark:    null
      }
    },
    mixins: [toast],
    created() {
      let user = firebase.auth().currentUser
      if (user) {
        this.uId = user.uid
        this.email = user.email
      }
    },
    methods: {
      onDone() {
        if (this.country && this.year && this.mark) {
          this.success('Loading...')

          let machineType = {
            country: this.country,
            year:    this.year,
            mark:    this.mark
          }

          firebase.database().ref('clients/' + this.uId).once('value', snap => {
            if (!snap.val()) {
              firebase.database().ref('clients/' + this.uId).set({
                email: this.email,
              }).then(() => {
                this.pushRepair(machineType)
              },
              error => {
                this.error(error.message)
              })
            } else {
              this.pushRepair(machineType)
            }
          })
        } else {
          this.warn('Data is incorrect')
        }
      },
      pushRepair(machineType) {
        firebase.database().ref('clients/' + this.uId + '/repaires').push().set({
          machineType
        }
        ).then(() => {
          this.$router.replace('/client')
          this.success('Done')
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