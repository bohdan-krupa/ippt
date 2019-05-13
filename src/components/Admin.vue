<template>
  <div>
    <h4>Менеджери:</h4>
    <div v-for="(manager, index) in managers" :key="index">
      <p>{{ manager.email }}</p><span>Видалити</span>
    </div>
    <Manager />
  </div>
</template>

<script>
  import firebase from 'firebase'
  import Manager from './Manager.vue'

  export default {
    data() {
      return {
        managers: []
      }
    },
    created() {
      firebase.database().ref('managers').once('value', snap => {
        const managers = snap.val()

        for (let managerId in managers) {
          this.managers.push({ email: managers[managerId], id: managerId })
        }
      })
    },
    components: {
      Manager
    }
  }
</script>