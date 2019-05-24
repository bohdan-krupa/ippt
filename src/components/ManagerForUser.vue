<template>
  <div>
    <div class="container">
      <h3>Клієнт: {{ email }}</h3>
      <h3>Ремонти:</h3>
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
        <div v-if="repair.startDate">
          <h4>Початок ремонту:</h4>
          <p>{{ repair.startDate }}</p>
        </div>
        <div v-if="repair.notes">
          <h4>Примітки:</h4>
          <p>{{ repair.notes }}</p>
        </div>
        <router-link
          v-if="repair.status == 'Очікування виду ремонту'"
          :to="'/set-repair-type/' + clientId + '/' + repair.repairId"
          class="sign-btn"
        >Встановити вид ремонту</router-link>
        <router-link
          v-if="repair.status == 'Очікування згоди'"
          :to="'/set-repair-type/' + clientId + '/' + repair.repairId"
          class="sign-btn"
        >Редагувати вид ремонту</router-link>
        <router-link
          v-if="repair.status == 'Очікування початку ремонту'"
          :to="'/start-repair/' + clientId + '/' + repair.repairId"
          class="sign-btn"
        >Почати ремонт</router-link>
        <div
          v-if="repair.status == 'На ремонті'"
          @click="onFinishRepair(repair.repairId)"
          class="sign-btn"
        >Завершити ремонт</div>
      </div>
    </div>
    <BackBtn />
  </div>
</template>

<script>
  // Компонент для обробки дій над певним користувачем менеджером

  import firebase from 'firebase'
  import BackBtn from './BackBtn.vue'

  export default {
    data() {
      return {
        clientId: null,
        email:    null,
        repaires: []
      }
    },
    created() {
      this.warn('Завантаження...')
      this.clientId = this.$route.params.clientId

      firebase.database().ref(`clients/${this.clientId}`).on('value', snap => {
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
    },
    methods: {
      onFinishRepair(repairId) {
        this.warn('Завантаження...')

        let dbRef = `clients/${this.clientId}/repaires/${repairId}/status`
        firebase.database().ref(dbRef).set(
          'Ремонт завершено'
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