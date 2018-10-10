<template>
  <div id="app">
    <!-- header -->
    <div class="container" id="app_header">
      <youni-header></youni-header>
    </div>

    <!-- body -->
    <div class="container" id="app_body">
      <router-view></router-view>
    </div>

    <!-- footer -->
    <div class="container" id="app_footer">
      <youni-footer></youni-footer>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import Home from '@/components/home/Home'

export default {
  name: 'app',
  components: {
    youniHeader: Header,
    youniFooter:Footer,
    youniHome: Home
  }
}
</script>

<style scoped>

</style>
