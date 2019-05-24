// Правка компонента для спливаючих сповіщень

import Vue from 'vue'

export default {
  toast: Vue.mixin({
    methods: {
      success(text) {
        this.$notify({
          title: text,
          type: 'success'
        })
      },
      warn(text) {
        this.$notify({
          title: text,
          type: 'warn'
        })
      },
      error(text) {
        this.$notify({
          title: text,
          type: 'error'
        })
      }
    }
  })
}