<template>
  <div class="container-fluid">
    <div v-if="value === 1">1</div>
    <div v-else-if="value">2</div>
    <div v-else>3</div>
  </div>
</template>

<script>
    export default {
        name: "",
      data() {
        return {
          value:null
        };
      }
    }
</script>

<style scoped>

</style>
