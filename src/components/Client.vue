<template>
  <div>
    <div class="container">
      <div v-if="!asked" @click="onAsk" class="sign-btn">Ask for repair</div>
      <div v-if="asked && !loading">
        <p>Країна-виробник</p>
        <input v-model="machineType.country" type="text">
        <p>Рік випуску</p>
        <input v-model="machineType.year" type="number" min="1980">
        <p>Марка</p>
        <input v-model="machineType.mark" type="text">
        <div @click="onDone" class="sign-btn">Готово</div>
      </div>
      <div v-if="loading">
        <div v-if="loading">
          <h3>Loading...</h3>
        </div>
      </div>
    </div>
    <div @click="onSignOut" class="sign-out-btn">Sign out</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        asked:   false,
        loading: false
        uId:     null,
        machineType: {
          country: null,
          year:    null,
          mark:    null
        }
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.uId = user.uid
        } else {
          this.$router.replace('/')
        }
      })
    },
    methods: {
      onSignOut() {
        firebase.auth().signOut().then(() => {
         this.$notify({
            title: 'You are logged out',
            type: 'success'
          })

          this.$router.replace('/')
        },
        error => {
          this.$notify({
            title: error.message,
            type: 'error'
          })
        })
      },
      onAsk() {
        this.asked = true
      },
      onDone() {
        if (this.machineType.country && this.machineType.year && this.machineType.mark) {
          this.loading = true
          
          firebase.database().ref('users/' + this.uId).set({
            country: this.machineType.country,
            year: this.machineType.year,
            mark: this.machineType.mark
          })
        } else {
          this.$notify({
            title: 'Невірні дані',
            type: 'warn'
          })
        }
      }
    }
  }
</script>

<style lang="sass">
  .sign-out-btn
    position: absolute
    left: 25px
    bottom: 25px
    width: 140px
    height: 40px
    background-color: lightblue
    text-align: center
    line-height: 40px
    border-radius: 20px
    cursor: pointer
</style>