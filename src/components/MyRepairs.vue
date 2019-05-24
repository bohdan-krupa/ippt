<template>
  <div>
    <div class="container">
      <h3>Мої ремонти:</h3>
      <p v-if="noRepair">У вас ще немає ремонтів</p>
      <div v-else v-for="(repair, index) in repaires" :key="index">
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
        <div v-if="repair.startDate">
          <h4>Початок ремонту:</h4>
          <p>{{ repair.startDate }}</p>
        </div>
        <div v-if="repair.notes">
          <h4>Примітки:</h4>
          <p>{{ repair.notes }}</p>
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
  // Компонент для відображення всіх ремонтів клієнта

  import firebase from 'firebase'
  import BackBtn from './BackBtn.vue'

  export default {
    data() {
      return {
        client: null,
        repaires: [],
        noRepair: false
      }
    },
    created() {
      this.warn('Завантаження...')
      this.client = firebase.auth().currentUser
      
      if (this.client) {
        firebase.database().ref(`clients/${this.client.uid}`).on('value', snap => {
          let data = snap.val()

          if (data) {
            this.repaires = []

            for (let repairId in data.repaires) {
              this.repaires.push({
                repairId,
                ...data.repaires[repairId]
              })
            }
          } else {
            this.noRepair = true
          }
        })
      
        this.success('Готово')
      }
    },
    methods: {
      onAgree(repairId) {
        this.warn('Завантаження...')

        let dbRef = `clients/${this.client.uid}/repaires/${repairId}/status`

        firebase.database().ref(dbRef).set(
          'Очікування початку ремонту'
        ).then(() => {
          this.success('Готово')
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