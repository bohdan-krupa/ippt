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
  import firbase from 'firbase'
  import toast from '../toast.js'

  export default {
    data() {
      return {
          country: null,
          year:    null,
          mark:    null
      }
    },
    created() {
      this.success('Loading...')

      firebase.database().ref('users/' + this.uId).once('value', snap => {
        this.country = snap.val().country
        this.year = snap.val().year
        this.mark = snap.val().mark

        this.success('Done')
      })
    }
  }
</script>