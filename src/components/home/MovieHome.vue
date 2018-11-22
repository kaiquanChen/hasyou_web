<template>
  <div id="movie_home">
    <a style="color: #8B4513;" href="#">
      <img class="img-circle" style="height: 30px;" src="/static/icon/movie.jpeg">&nbsp
      <strong style="font-size: 20px;">有你．电影</strong>
    </a>
    <br/><br/>
    <span style="color: green;">今日推荐  · · · · · · </span><a href="#" style="color: chocolate">(更多)</a>
    <div class="list-group-item col-sm-12" id="movie_body">
      <ol class="list-group"  v-for="item in data">
        <li :id='item.id' class="list-group-item">【电影】
          <a href="#">{{item.title}}</a>
          <span class="badge">{{item.average}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  var base_post_url = global_.URLS.DOUBAN_MOVIE;
  var post_url = base_post_url + "/subjects?type=movie&p=1&count=5";
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
      this.$http.get(post_url, {
        headers: {
          "bid": global_.FUNC.getBid()
        }
      }).then((data) => {
        if (data.status !== 200) {
          console.log(data);
          alert("数据获取失败!");
          return;
        }
        this.data = data.body.data.body;
      });
    }
  }
</script>

<style scoped>
  #movie_home {
    margin: 5px 0 5px 30px;
  }

  #movie_body {
    margin: 5px 5px 5px 0;
    border: white;
  }

  @media screen and (max-width: 415px) {

    #movie_home {
      margin: 15px 0 5px 0;
    }

    div#movie_body {
      padding: 0;
    }

  }
</style>
