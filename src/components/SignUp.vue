<template>
	<div class="container">
    <div v-if="!loading">
      <p>Email</p>
      <input v-model="email" :class="{ green: isGood.email }" type="text">
      <p>Password</p>
      <input v-model="password" :class="{ green: isGood.password }" type="password">
      <p>Password once again</p>
      <input v-model="password2" :class="{ green: isGood.password2 }" type="password">
      <div @click="onSignUp" class="sign-btn">Sign up</div>
    </div>
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
	</div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data() {
      return {
        loading:   false,
        email:     null,
        password:  null,
        password2: null,
        isGood: {
          email:     false,
          password:  false,
          password2: false
        }
      }
    },
    watch: {
      email: function(val) {
        let regExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        this.isGood.email = regExp.test(val) ? 1 : 0 
      },
      password: function(val) {
        let regExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/
        this.isGood.password = regExp.test(val) ? 1 : 0
        this.isGood.password2 = this.isGood.password && val == this.password2 ? 1 : 0
      },
      password2: function(val) {
        this.isGood.password2 = this.isGood.password && this.password == val ? 1 : 0
      }
    },
    methods: {
      onSignUp() {
        if (this.isGood.email && !this.isGood.password && !this.isGood.password2) {
          this.loading = true

          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
            this.$notify({
              title: 'You are registered',
              type: 'success'
            })
            this.$router.replace('/')
          },
          error => {
            this.$notify({
              title: error.message,
              type: 'error'
            })
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style lang="sass">  
  .green
    border-color: green
</style>