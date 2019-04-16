<template>
	<div class="container">
    <p>Username {{ username }}</p>
		<input v-model="username" type="text">
		<p>Password {{ password }}</p>
		<input v-model="password" type="password">
		<p>Password once again {{ password2 }}</p>
		<input v-model="password2" type="password">
    <div class="sign-up-btn">Sign up</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        username: null,
        password: null,
        password2: null
      }
    }
  }
</script>

<style lang="sass">
  input
    border: 0.5px solid #333
  
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
</style>