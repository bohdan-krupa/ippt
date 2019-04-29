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
    <div @click="onBack" class="bottom-right-btn">Back</div>
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

          firebase.database().ref('users/' + this.uId).once('value', snap => {
            let newRepair = {
                country: this.country,
                year:    this.year,
                mark:    this.mark
            }

            if (!snap.val()) {
              firebase.database().ref('users/' + this.uId).set({
                email: this.email,
                repairs: [newRepair]
              }).then(() => {
                this.$router.replace('/client')
                this.success('Done')
              },
              error => {
                this.error(error.message)
              })
            } else {
              firebase.database().ref('users/' + this.uId + '/repairs').push().set(
                newRepair
              ).then(() => {
                this.$router.replace('/client')
                this.success('Done')
              },
              error => {
                this.error(error.message)
              })
            }
          })
        } else {
          this.warn('Data is incorrect')
        }
      },
      onBack() {
        this.$router.go(-1)
      }
    }
  }
</script>