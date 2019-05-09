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
          v-if="repair.status == 'Очікування на згоду'"
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
        clientId: null,
        email:    null,
        repaires: []
      }
    },
    mixins: [toast],
    created() {
      this.success('Loading...')
      this.clientId = firebase.auth().currentUser.uid
      if (this.clientId) {
        firebase.database().ref('clients/' + this.clientId).once('value', snap => {
          let data = snap.val()

          this.email = data.email

          for (let repairId in data.repaires) {
            this.repaires.push({
              repairId,
              ...data.repaires[repairId]
            })
          }
        })
      
        this.success('Done')
      }
    },
    methods: {
      onAgree() {
        firebase.database.ref('clients/' + this.clientId + '/repaires/' + )
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