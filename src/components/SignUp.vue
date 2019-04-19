<template>
	<div class="container">
    <div v-if="showing == 'inputs'">
      <p>Username</p>
      <input v-model="username" :class="{ green: isGood.username }" type="text">
      <p>Password</p>
      <input v-model="password" :class="{ green: isGood.password }" type="password">
      <p>Password once again</p>
      <input v-model="password2" :class="{ green: isGood.password2 }" type="password">
      <div @click="onSignUp" class="sign-up-btn">Sign up</div>
    </div>
    <div v-if="showing == 'loading'">
      <h3>Loading...</h3>
    </div>
    <div v-if="showing == 'success'">
      <h3>You are successfully registered</h3>
      <router-link to="/sign-in">Sign in</router-link>
    </div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        showing: 'inputs',
        username: null,
        password: null,
        password2: null,
        isGood: {
          username: false,
          password: false,
          password2: false
        }
      }
    },
    watch: {
      username: function(val) {
        let regExp = /^[a-zA-Z0-9]{6,}$/
        this.isGood.username = regExp.test(val) ? 1 : 0 
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
        if (this.isGood.username && this.isGood.password && this.isGood.password2) {
          this.showing = 'success'
          // firebase.auth().createUserWithEmailAndPassword(email, password)
        }
      }
    }
  }
</script>

<style lang="sass">
  input
    border: 1px solid #333
    outline: none
    padding: 10px
  
  .sign-up-btn
    position: relative
    left: 50%
    margin-top: 25px
    transform: translateX(-50%)
    width: 140px
    height: 40px
    margin-bottom: 15px
    background-color: lightblue
    text-decoration: none
    text-align: center
    line-height: 40px
    border-radius: 20px
    cursor: pointer

  .green
    border-color: green
</style>