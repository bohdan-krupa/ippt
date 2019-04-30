<template>
  <div @click="onBack">Back</div>
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

<style lang="sass" scoped>
  div
    // position: absolute
    // left: 25px
    // bottom: 25px
    width: 140px
    height: 40px
    margin: 50px 0 30px 25px
    background-color: lightblue
    text-align: center
    line-height: 40px
    border-radius: 20px
    cursor: pointer
</style>