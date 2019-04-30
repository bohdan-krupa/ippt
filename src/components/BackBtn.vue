<template>
  <div @click="onBack" class="right-bottom-btn">Back</div>
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
  .right-bottom-btn
    width: 140px
    height: 40px
    margin: 50px 0 30px 25px
    background-color: lightblue
    text-align: center
    line-height: 40px
    border-radius: 20px
    cursor: pointer
</style>