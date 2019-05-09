<template>
  <div>
    <div class="container">
      <p>Вид станка:</p>
      <h4>{{ machineType.country }}</h4>
      <h4>{{ machineType.year }}</h4>
      <h4>{{ machineType.mark }}</h4>
      <hr>
      <p>* Назва ремонту:</p>
      <input v-model="repairType.name" type="text">
      <p>* Тривалість (дн.):</p>
      <input v-model="repairType.duration" type="number">
      <p>* Ціна (грн):</p>
      <input v-model="repairType.price" type="number">
      <p>Примітки:</p>
      <input v-model="repairType.notes" type="text">
      <div @click="onSetRepairType" class="sign-btn">Готово</div>
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
        clientId: null,
        repairId: null,
        machineType: {
          country: null,
          year:    null,
          mark:    null
        },
        repairType: {
          name:     null,
          duration: null,
          price:    null,
          notes:    null
        }
      }
    },
    created() {
      this.clientId = this.$route.params.clientId
      this.repairId = this.$route.params.repairId

      let dbRef = 'clients/' + this.clientId + '/repaires/' + this.repairId + '/machineType'
      firebase.database().ref(dbRef).once('value', snap => {
        this.machineType = snap.val()
      })
    },
    methods: {
      onSetRepairType() {
        if (this.repairType.name && this.repairType.duration && this.repairType.price) {
          this.warn('Завантаження...')

          let dbRef = `clients/${this.clientId}/repaires/${this.repairId}`
          
          firebase.database().ref(dbRef).update({
            status:     'Очікування виду ремонту'
            repairType: this.repairType
          }).then(() => {
            this.$router.replace('/manager/' + this.clientId)
          },
          error => {
            this.error(error.message)
          })
        } else {
          this.error('Невірні дані')
        }
      }
    },
    components: {
      BackBtn
    }
  }
</script>