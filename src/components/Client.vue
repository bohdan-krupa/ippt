<template>
  <div>
    <div class="container">
      <div v-if="!asked && !tasked">
        <router-link to="/client/new-repair" class="sign-btn">Ask for repair</router-link>
        <div @click="onMyTasks" class="sign-btn">My tasks</div>
      </div>
      <div v-if="tasked">
        <p>Machine:</p>
        <h4>{{ getType.country }}</h4>
        <h4>{{ getType.year }}</h4>
        <h4>{{ getType.mark }}</h4>
      </div>
    </div>
    <div @click="onSignOut" class="bottom-right-btn">Sign out</div>
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