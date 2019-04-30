<template>
  <div>
    <h1>Repair of machines</h1>
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
    margin: 100px auto 0 auto
    width: max-content
    // top: 50%
    // left: 50%
    // transform: translate(-50%, -50%)

  h1
    text-align: center
    margin-top: 40px
</style>