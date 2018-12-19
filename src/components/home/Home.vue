<template>
  <div id="home" class="row">
    <div class="col-lg-2">

    </div>
    <div class="col-lg-8 col-xs-12">
      <youniMoment></youniMoment>
    </div>
    <div class="col-lg-2">

    </div>
  </div>
</template>

<script>
  import Moment from '@/components/home/Moment'
  export default {
    name: "home",
    components: {
      youniMoment: Moment
    },
    created() {
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 415px) {
    .home-blank {
      display: none;
    }

    #home {
      padding: 0;
    }

  }


</style>
