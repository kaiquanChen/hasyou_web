<template>
    <div class="row">
      <div class="col-lg-12 col-xs-12"><h1>电影 Top 250</h1></div>
      <div class="col-lg-9 col-xs-12 list-body">
        <div class="col-lg-12 col-xs-12 list-group-item" v-for="item in movies">
          <div class="col-lg-2 col-xs-3 top250-img">
            <router-link :to="getMovieDetail(item.id)" append v-if="item.image_url"><img :src="item.image_url"></router-link>
            <router-link :to="getMovieDetail(item.id)" append v-else><img :src="item.image.medium"></router-link>
          </div>
          <div class="col-lg-10 col-xs-9 top250-movie-info">
            <router-link :to="getMovieDetail(item.id)">{{item.movie_tag.rank}}.{{item.title}}&nbsp;/&nbsp;{{item.original_title}}</router-link><br>
            <el-rate class="movie-rate" v-model="item.average/2" :score-template="item.average + ''" show-score='true' disabled>&nbsp;{{item.stars}}</el-rate><br/>
            <span>{{item.ratings_count}}人评价</span>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12" id="pagination-bottom">
          <el-pagination background
                         @current-change="handleCurrentChange"
                         :current-page.sync="page.page"
                         :page-size="page.count"
                         :small="checkMedia()"
                         layout="total, prev, pager, next"
                         :total="page.total">
          </el-pagination>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
</template>

<script>
  import global_ from "../config/Global"
  const movie_url = global_.URLS.DOUBAN_MOVIE;
    export default {
        name: "",
      data(){
          return {
            movies:[],
            page:{
              page:1,
              count:25,
              total:250
            }
          }
      },
      methods:{
        getMovieList(type, p, count) {
          this.$http.get(movie_url + type + "?p=" + p + "&count=" + count).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.movies = data.body.data.body;
            this.page.total = data.body.data.total;
            this.page.page = data.body.data.page;
            this.page.count = data.body.data.count;
          });
        },
        handleCurrentChange(val) {
          this.page.page = val;
          this.getMovieList("TOP250", val, this.page.count);
        },
        checkMedia() {
          return window.matchMedia('(max-width:415px)').matches;
        },
        getMovieDetail(id) {
          return "/movie/subject/" + id;
        }
      },
      created() {
        this.getMovieList("TOP250", this.page.page, this.page.count);
      }
    }
</script>

<style scoped>
  div.top250-movie-info span,p {
    color: #666666;
  }

  div.list-group-item {
    margin-bottom: 1px;
    border-top: white;
    border-left: white;
    border-right: white;
    border-bottom: #bbbbbb 1px dashed;
  }

  div.top250-img {
    width: 100px;
    padding-right: 0;
  }

  div.top250-img img {
    width: 100%;
    float: right;
  }

  .movie-rate {
    margin: 10px 0;
  }

  @media screen and (max-width: 415px) {

    div.list-group-item {
      padding-left: 0;
      padding-right: 0;
    }

    div.list-body {
      padding: 0;
    }

    div.top250-movie-info a {
      font-size: 12px;
    }
  }
</style>
