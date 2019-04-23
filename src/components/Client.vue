<template>
  <div>
    <div class="container">
      <h3>{{ name }}</h3>
      <div v-if="!asked" @click="onAsk" class="sign-btn">Ask for repair</div>
      <div v-else>
        <p>Email</p>
        <input v-model="email" :class="{ green: isGood.email }" type="text">
        <p>Password</p>
        <input v-model="password" :class="{ green: isGood.password }" type="password">
        <p>Password once again</p>
        <input v-model="password2" :class="{ green: isGood.password2 }" type="password">
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
        name:  null,
        asked: false
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.name = user.email
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