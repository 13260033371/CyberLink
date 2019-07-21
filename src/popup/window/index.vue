<template>
  <div class="window-container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'empty',

    created () {
      document.title = 'ELA'
    }
  }
</script>

<style scoped>
  .window-container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
