<template>
  <div>
    <h1>Ремонт станків</h1>
    <router-view></router-view>
    <notifications position="top right" />
  </div>
</template>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Montserrat')

  *
    font-family: 'Montserrat'
    color: #333
    user-select: none

  .container
    position: relative
    margin: 50px auto 50px auto
    width: max-content

  h1
    text-align: center
    margin-top: 40px

  body
    background-image: url('../src/assets/bg.jpg')
</style>