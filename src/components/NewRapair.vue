<template>
  <div class="container">
    <p>Країна-виробник</p>
    <input v-model="machineType.country" type="text">
    <p>Рік випуску</p>
    <input v-model="machineType.year" type="number" min="1980">
    <p>Марка</p>
    <input v-model="machineType.mark" type="text">
    <div @click="onDone" class="sign-btn">Готово</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        asked:  false,
        tasked: false,
        uId:    null,
        machineType: {
          country: null,
          year:    null,
          mark:    null
        }
      }
    }
  }
</script>