<template>
  <div>
    <div class="container">
      <h4>Менеджери:</h4>
      <div v-for="(manager, index) in managers" :key="index">
        <p>{{ manager.email }}</p>
        <div @click="onDeleteManager(manager.id)" class="admin-btn">Понизити до клієнта</div>
      </div>
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
    methods: {
      onDeleteManager(id) {
        firebase.database().ref(`managers/${id}`).remove().then(() => {
          this.success('Ви')
        })
      }
    },
    components: {
      Manager
    }
  }
</script>

<style lang="sass" scoped>
  p
    display: inline

  .admin-btn
    display: inline
    margin-left: 15px
    padding: 10px 12px
    background: lightblue
    cursor: pointer
</style>