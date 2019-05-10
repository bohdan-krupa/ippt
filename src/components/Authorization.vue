<template>
  <div class="container">
    <router-link to="/sign-in">Вхід</router-link>
    <router-link to="/sign-up">Реєстрація</router-link>
  </div>
</template>

<style lang="sass">
  a
    display: block
    width: 140px
    height: 40px
    margin: 0 auto 15px auto
    background-color: lightblue
    color: #333
    text-decoration: none
    text-align: center
    line-height: 40px
    border-radius: 20px

  input
    border: 1px solid #333
    outline: none
    padding: 10px

  .sign-btn
    position: relative
    left: 50%
    margin-top: 25px
    transform: translateX(-50%)
    width: calc(100% + 30px)
    height: 40px
    background-color: lightblue
    text-align: center
    line-height: 40px
    border-radius: 20px
    cursor: pointer
</style>