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
  </div>
</template>

<script>
  import firebase from 'firebase'
  import toast from '../toast.js'

  export default {
    data() {
      return {
        country: null,
        year:    null,
        mark:    null,

        uId:     null,
        email:   null
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

          firebase.database().ref('clients/' + this.uId).once('value', snap => {
            let newRepair = {
                country: this.country,
                year:    this.year,
                mark:    this.mark
            }

            if (!snap.val()) {
              firebase.database().ref('clients/' + this.uId).set({
                email: this.email,
              }).then(() => {
                this.pushRepair(newRepair)
              },
              error => {
                this.error(error.message)
              })
            } else {
              this.pushRepair(newRepair)
            }
          })
        } else {
          this.warn('Data is incorrect')
        }
      },
      pushRepair(repair) {
        firebase.database().ref('clients/' + this.uId + '/machines').push().set(
          repair
        ).then(() => {
          this.$router.replace('/client')
          this.success('Done')
        },
        error => {
          this.error(error.message)
        })
      }
    }
  }
</script>