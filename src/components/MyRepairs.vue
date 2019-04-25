<template>
  <div>
    <div class="container">
      <p>Machine:</p>
      <h4>{{ country }}</h4>
      <h4>{{ year }}</h4>
      <h4>{{ mark }}</h4>
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
          mark:    null
      }
    },
    mixins: [toast],
    created() {
      this.success('Loading...')

      firebase.auth().onAuthStateChanged(user => {
        firebase.database().ref('users/' + user.uid).once('value', snap => {
          this.country = snap.val().country
          this.year = snap.val().year
          this.mark = snap.val().mark

          this.success('Done')
        })
      })
    },
    methods: {
      onBack() {
        this.$router.go(-1)
      }
    }
  }
</script>