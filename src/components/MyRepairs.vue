<template>
  <div>
    <div class="container">
      <h3>Мої ремонти:</h3>
      <div v-for="(repair, index) in repaires" :key="index">
        <hr />
        <p>Статус: {{ repair.status }}</p>
        <h4>Вид станка:</h4>
        <p>Країна: {{ repair.machineType.country }}</p>
        <p>Рік: {{ repair.machineType.year }}</p>
        <p>Марка: {{ repair.machineType.mark }}</p>
        <div v-if="repair.repairType">
          <h4>Вид ремонту:</h4>
          <p>Назва ремонту: {{ repair.repairType.name }}</p>
          <p>Тривалість: {{ repair.repairType.duration }} дн.</p>
          <p>Ціна: {{ repair.repairType.price }} грн</p>
          <p v-if="repair.repairType.notes">Примітки: {{ repair.repairType.notes }}</p>
        </div>
        <div
          v-if="repair.status == 'Очікування згоди'"
          @click="onAgree(repair.repairId)"
          class="sign-btn"
        >Я погоджуюсь</div>
      </div>
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
        client: null,
        email:    null,
        repaires: []
      }
    },
    mixins: [toast],
    created() {
      this.success('Loading...')
      this.client = firebase.auth().currentUser
      if (this.client) {
        firebase.database().ref('clients/' + this.client.uid).on('value', snap => {
          let data = snap.val()

          this.email = data.email
          this.repaires = []

          for (let repairId in data.repaires) {
            this.repaires.push({
              repairId,
              ...data.repaires[repairId]
            })
          }
        })
      
        this.success('Готово')
      }
    },
    methods: {
      onAgree(repairId) {
        let dbRef = 'clients/' + this.client.uid + '/repaires/' + repairId + '/status'
        firebase.database().ref(dbRef).set(
          'Очікування початку ремонту'
        ).then(() => {
          this.success('Завантаження...')
        },
        error => {
          this.error(error.message)
        })
      },
      dateDiff(startDate, daysOfRepair) {
        startDate = new Date(startDate)
        let daysAgo = (
          Date.now() - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        ) / (1000 * 60 * 60 * 24)

        return daysAgo > daysOfRepair
      }
    },
    components: {
      BackBtn
    }
  }
</script>