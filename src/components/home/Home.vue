<template>
  <div id="home">
    <div class="row">
      <div class="col-sm-5 col-xs-12">
        <!--read-->
        <youni-read></youni-read>
      </div>
      <div class="col-sm-5 col-xs-12">
        <!--forum-->
        <youni-forum></youni-forum>
      </div>
      <div class="col-sm-2 home-blank">
      </div>
    </div>

    <div class="row">
      <div class="col-sm-5 col-xs-12">
        <!--movie-->
        <youni-movie></youni-movie>
      </div>
      <div class="col-sm-5 col-xs-12">
        <!--book-->
        <youni-book></youni-book>
      </div>
      <div class="col-sm-2 home-blank">
      </div>
    </div>

    <div class="row">
      <div class="col-sm-5 col-xs-12">
        <!--music-->
        <youni-music></youni-music>
      </div>
      <div class="col-sm-5 col-xs-12">
        <!--event-->
        <youni-event></youni-event>
      </div>
      <div class="col-sm-2 home-blank">

      </div>
    </div>
  </div>
</template>

<script>
  import ReadHome from '@/components/home/ReadHome'
  import BookHome from '@/components/home/BookHome'
  import MovieHome from '@/components/home/MovieHome'
  import ForumHome from '@/components/home/ForumHome'
  import MusicHome from '@/components/home/MusicHome'
  import EventHome from '@/components/home/EventHome'

  export default {
    name: "home",
    components: {
      youniRead: ReadHome,
      youniBook: BookHome,
      youniMovie: MovieHome,
      youniForum: ForumHome,
      youniMusic: MusicHome,
      youniEvent: EventHome
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
