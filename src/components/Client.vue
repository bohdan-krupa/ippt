<template>
  <div>
    <div class="container">
      <p></p>
      <router-link to="/client/new-repair" class="sign-btn">Звернутись за ремонтом</router-link>
      <router-link to="/client/my-repairs" class="sign-btn">Мої ремонти</router-link>
    </div>
    <SignOut />
  </div>
</template>

<script>
  import SignOut from './SignOut.vue'
  import toast from '../toast.js'

  export default {
    components: {
      SignOut
    },
    mixins: [toast]
  }
</script>