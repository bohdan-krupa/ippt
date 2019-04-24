<template>
  <div>
    <div class="container">
      <div v-if="!asked && !tasked">
        <div @click="onAsk" class="sign-btn">Ask for repair</div>
        <div @click="onMyTasks" class="sign-btn">My tasks</div>
      </div>
      <router-view></router-view>
      <div v-if="tasked">
        <p>Machine:</p>
        <h4>{{ getType.country }}</h4>
        <h4>{{ getType.year }}</h4>
        <h4>{{ getType.mark }}</h4>
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
        asked:  false,
        tasked: false,
        uId:    null,
        machineType: {
          country: null,
          year:    null,
          mark:    null
        },
        getType: {
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
          this.$notify({
            title: 'Loading...',
            type: 'success'
          })

          firebase.database().ref('users/' + this.uId).set({
            country: this.machineType.country,
            year: this.machineType.year,
            mark: this.machineType.mark
          }).then(() => {
            this.asked = false

            this.$notify({
              title: 'Done',
              type: 'success'
            })
          })
        } else {
          this.$notify({
            title: 'Невірні дані',
            type: 'warn'
          })
        }
      },
      onMyTasks() {
        this.tasked = true

        this.$notify({
          title: 'Loading...',
          type: 'success'
        })

        firebase.database().ref('users/' + this.uId).once('value', snap => {
          this.getType.country = snap.val().country
          this.getType.year = snap.val().year
          this.getType.mark = snap.val().mark

          this.$notify({
            title: 'Done',
            type: 'success'
          })
        })
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