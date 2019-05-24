<template>
  <div>
    <div class="container">
      <p>Дата початку: {{ date }}</p>
      <p>Примітки:</p>
      <input v-model="notes" type="text">
      <div @click="onStartRepair" class="sign-btn">Почати ремонт</div>
    </div>
    <BackBtn />
  </div>
</template>

<script>
  // Компонент для початку ремонту менеджером

  import firebase from 'firebase'
  import BackBtn from './BackBtn.vue'

  export default {
    data() {
      return {
        clientId: null,
        repairId: null,

        date:     null,
        notes:    null
      }
    },
    created() {
      this.clientId = this.$route.params.clientId
      this.repairId = this.$route.params.repairId

      let date = new Date()
      date = date.toISOString()
      date = date.split('T')[0]
      date = date.replace(/-/g, '.')

      this.date = date
    },
    methods: {
      onStartRepair() {
        this.warn('Завантаження...')

        let dbRef = `clients/${this.clientId}/repaires/${this.repairId}`

        firebase.database().ref(dbRef).update({
          status:    'На ремонті',
          startDate: this.date,
          notes:     this.notes
        }).then(() => {
          this.success('Ремонт почато')

          this.$router.replace(`/manager/${this.clientId}`)
        },
        error => {
          this.error(error.message)
        })
      }
    },
    components: {
      BackBtn
    }
  }
</script>