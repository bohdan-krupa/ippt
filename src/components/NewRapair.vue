<template>
  <div class="container">
    <p>Країна-виробник</p>
    <input v-model="country" type="text">
    <p>Рік випуску</p>
    <input v-model="year" type="number" min="1980">
    <p>Марка</p>
    <input v-model="mark" type="text">
    <div @click="onDone" class="sign-btn">Готово</div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  function sayHi() {
    this.$notify({
      title: 'sdfg'
    }).bind(this)
  }

  export default {
    data() {
      return {
        country: null,
        year:    null,
        mark:    null,

        uId:     null
      }
    },
    methods: {
      onDone() {
        if (this.country && this.year && this.mark) {
          this.$notify({
            title: 'Loading...',
            type: 'success'
          })

          firebase.database().ref('users/' + this.uId).set({
            country: this.country,
            year: this.year,
            mark: this.mark
          }).then(() => {
            this.$router.replace('/client')

            this.$notify({
              title: 'Done',
              type: 'success'
            })
          },
          error => {
            this.$notify({
              title: error.message,
              type: 'error'
            })
            sayHi()
          })
        } else {
          this.$notify({
            title: 'Невірні дані',
            type: 'warn'
          })
        }
      }
    }
  }
</script>