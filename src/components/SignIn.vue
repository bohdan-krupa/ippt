<template>
  <div>
      <div class="container">
        <form>
          <p>Email:</p>
          <input v-model="email" type="email">
          <p>Пароль:</p>
          <input v-model="password" type="password">
          <div @click="onSignIn" class="sign-btn">Ввійти</div>
        </form>
      </div>
      <BackBtn />
  </div>
</template>

<script>
  import firebase from 'firebase'
  import BackBtn from './BackBtn.vue'
  import toast from '../toast.js'

  export default {
    data() {
      return {
        email:    null,
        password: null
      }
    },
    methods: {
      onSignIn() {
        if (this.email && this.password.length > 5) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
            this.success('Ви успішно ввійшли')
            this.$router.replace('/client')
          },
          error => {
            this.error(error.message)
          })
        }
      }
    },
    components: {
      BackBtn
    },
    mixins: [toast]
  }
</script>