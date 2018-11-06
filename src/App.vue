<template>
  <div id="app" class="container-fluid">
    <!-- header -->
    <div class="row" id="app_header">
      <youni-header></youni-header>
    </div>

    <!-- body -->
    <div :class="checkMedia()" id="app_body">
      <router-view></router-view>
    </div>

    <!-- footer -->
    <div class="row" id="app_footer">
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
  },
  methods: {
    checkMedia() {
      let media =  window.matchMedia('(max-width:600px)');
      if (media.matches) {
        return "container-fluid";
      } else {
        return "container";
      }
    }
  },
  created() {

  }
}
</script>

<style scoped>
  @media screen and (max-width: 415px) {
    #app_body {
      padding: 0;
    }
  }
</style>
