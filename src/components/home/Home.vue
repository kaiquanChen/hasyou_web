<template>
  <div class="container">
    <div class="container">
      <div class="col-sm-5">
        <!--read-->
        <youni-read></youni-read>
      </div>
      <div class="col-sm-5">
        <!--forum-->
        <youni-forum></youni-forum>
      </div>
      <div class="col-sm-2">

      </div>
    </div>

    <div class="container">
      <div class="col-sm-5">
        <!--movie-->
        <youni-movie></youni-movie>
      </div>
      <div class="col-sm-5">
        <!--book-->
        <youni-book></youni-book>
      </div>
      <div class="col-sm-2">

      </div>
    </div>

    <div class="container">
      <div class="col-sm-5">
        <!--music-->
        <youni-music></youni-music>
      </div>
      <div class="col-sm-5">
        <!--event-->
        <youni-event></youni-event>
      </div>
      <div class="col-sm-2">

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
        components:{
          youniRead: ReadHome,
          youniBook: BookHome,
          youniMovie: MovieHome,
          youniForum: ForumHome,
          youniMusic: MusicHome,
          youniEvent: EventHome
        }
    }
</script>

<style scoped>

</style>
