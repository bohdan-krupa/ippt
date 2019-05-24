<template>
  <div>
      <div class="container">
        <div v-if="!loading">
          <Form @onGetData="onSignUp" btn-text="Зареєструватись" />
        </div>
        <div v-if="loading">
          <h3>Завантаження...</h3>
        </div>
      </div>
      <BackBtn />
  </div>
</template>

<script>
  // Компонент для реєстрації клієнта

  import firebase from 'firebase'
  import Form from './Form.vue'
  import BackBtn from './BackBtn'
  import toast from '../toast.js'

  export default {
    data() {
      return {
        loading: false
      }
    },
    methods: {
      onSignUp(data) {
        this.loading = true

        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(() => {
          this.success('Ви зареєструвались')
          this.$router.replace('/')
        },
        error => {
          this.error(error.message)
          this.loading = false
        })
      }
    },
    components: {
      Form,
      BackBtn
    },
    mixins: [toast]
  }
</script>