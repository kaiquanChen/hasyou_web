<template>
  <div class="parent">
    <div class="son-1">

    </div>
  </div>
</template>
<script>
  import { slider, slideritem } from 'vue-concise-slider'// import slider components
  export default {
    el: '#app',
    data () {
      return {
        //Image list
        someList:[],
        //Sliding configuration [obj]
        options: {
          currentPage: 0,
          thresholdDistance:500,
          thresholdTime:100,
          autoplay:1000,
          loop:true,
          direction:'vertical',
          loopedSlides:1,
          slidesToScroll:1,
          timingFunction: 'ease',
          speed: 300
        }
      }
    },
    components: {
      slider,
      slideritem
    },
    mounted () {
      let that = this
      setTimeout(function () {
        that.someList = [
          {
            html: 'slide1',
            style: {
              'background': '#1bbc9b'
            }
          },
          {
            html: 'slide2',
            style: {
              'background': '#4bbfc3'
            }
          },
          {
            html: 'slide3',
            style: {
              'background': '#7baabe'
            }
          }
        ]
      }, 2000)
    },
    methods: {
      // Listener event
      slide (data) {
        console.log(data)
      },
      onTap (data) {
        console.log(data)
      },
      onInit (data) {
        console.log(data)
      }
    },
    created() {
      
    }
  }
</script>

<style scoped>
  .parent {
    margin: 100px;
    background-color: black;
    width: 200px;
    height: 200px;
  }

  .son-1 {
    position: relative;
    background-color: yellow;
    width: 50px;
    height: 100px;
    left: 20px;
    top: 30px;
  }
</style>
