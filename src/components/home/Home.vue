<template>
  <div id="home" class="row">
    <youniMoment></youniMoment>
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
