<template>
  <form>
    <p>Email *</p>
    <input v-model="email" :class="{ green: isGood.email }" type="email">
    <p>Пароль *</p>
    <input v-model="password" :class="{ green: isGood.password }" type="password">
    <p>Пароль ще раз *</p>
    <input v-model="password2" :class="{ green: isGood.password2 }" type="password">
    <div @click="emitData" class="sign-btn">{{ btnText }}</div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        email:     '',
        password:  '',
        password2: '',
        isGood: {
          email:     false,
          password:  false,
          password2: false
        }
      }
    },
    props: {
      btnText: String
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
      emitData() {
        if (this.isGood.email && this.isGood.password && this.isGood.password2) {
          this.$emit('onGetData', {
            email: this.email,
            password: this.password
          })
        } else {
          this.error('Невірні дані')
        }
      }
    }
  }
</script>

<style lang="sass">  
  .green
    border-color: green
</style>