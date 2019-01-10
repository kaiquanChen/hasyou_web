<template>
  <div class="row" id="user-center"></div>
</template>

<script>
    export default {
        name: "User",
        methods: {
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          }
        }

    }
</script>

<style scoped>
  #test {
    width: 200px;
    height: 200px;
    position: absolute;
    background-color: red;
  }

  #test2 {
    width: 200px;
    height: 200px;
    position: absolute;
    background-color: yellow;
  }
</style>
