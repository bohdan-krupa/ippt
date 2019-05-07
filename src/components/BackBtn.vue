<template>
  <div @click="onBack" id="right-bottom-btn">Back</div>
</template>

<script>
  export default {
    methods: {
      onBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="sass">
  #right-bottom-btn
    position: fixed
    bottom: 0
    width: 140px
    height: 40px
    margin: 0 0 26px 20px
    background-color: lightblue
    text-align: center
    line-height: 40px
    border-radius: 20px
    cursor: pointer
</style>