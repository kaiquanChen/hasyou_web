<template>
  <div id="music_home">
    <a style="color: #8B4513;" href="#">
      <img class="img-circle" style="height: 30px;" src="/static/icon/talk.jpeg">&nbsp
      <strong style="font-size: 20px;">有你．音乐</strong>
    </a>
    <br/><br/>
    <span style="color: green;">今日推荐  · · · · · · </span><a href="#" style="color: chocolate">(更多)</a>
    <div class="list-group-item col-sm-12" id="music_body">
      <ol class="list-group"  v-for="item in data">
        <li :id='item.id' class="list-group-item">【音乐】
          <a href="#">{{item.title}}</a>
          <span class="badge">{{item.stars}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  let base_music_url = global_.URLS.DOUBAN_MUSIC_URL;
  let music_url = base_music_url + "/subjects";
  export default {
    name: "MovieHome",
    data(){
      return {
        data: []
      }
    },
    methods:{

    },
    created() {
      this.$http.get(music_url).then((data) => {
        if (data.status !== 200) {
          console.log(data);
          alert("数据获取失败!");
          return;
        }
        this.data = data.body.data;
      });
    }
  }
</script>

<style scoped>
  #music_home {
    margin: 5px 0 5px 30px;
  }

  #music_body {
    margin: 5px 5px 5px 0;
    border: white;
  }

  @media screen and (max-width: 415px) {

    #music_home {
      margin: 15px 0 5px 0;
    }

    div#music_body {
      padding: 0;
    }

  }
</style>
