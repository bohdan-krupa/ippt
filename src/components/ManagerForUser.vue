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
        <router-link
          v-if="repair.status == 'Очікування виду ремонту'"
          :to="'/set-repair-type/' + $route.params.clientId + '/' + repair.repairId"
          class="sign-btn"
        >Встановити вид ремонту</router-link>
        <router-link
          v-if="repair.status == 'Очікування згоди'"
          :to="'/set-repair-type/' + $route.params.clientId + '/' + repair.repairId"
          class="sign-btn"
        >Редагувати вид ремонту</router-link>
        <router-link
          v-if="repair.status == 'Очікування початку ремонту'"
          :to="'/start-repair/' + $route.params.clientId + '/' + repair.repairId"
          class="sign-btn"
        >Почати ремонт</router-link>
      </div>
    </div>
    <BackBtn />
  </div>
</template>

<script>
  import firebase from 'firebase'
  import BackBtn from './BackBtn.vue'

  export default {
    data() {
      return {
        repaires: [],
        email:    null
      }
    },
    created() {
      this.warn('Завантаження...')
      let clientId = this.$route.params.clientId

      firebase.database().ref('clients/' + clientId).once('value', snap => {
        let data = snap.val()

        this.email = data.email

        for (let repairId in data.repaires) {
          this.repaires.push({
            repairId,
            ...data.repaires[repairId]
          })
        }

        this.success('Готово')
      })
    },
    methods: {
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