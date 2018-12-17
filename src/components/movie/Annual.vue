<template>
    <div class="row annual">
      <h1 id="annual-title">{{year}}年度电影榜单</h1>
      <div class="col-xs-12 col-lg-12 annual-item" :style="{'background': 'url('+item.payload.background_img+') no-repeat center center'}"  v-for="item in body">
        <div class="col-xs-12 col-lg-12 annual-body" v-show="!web">
          <div class="col-xs-12 right">
            <div class="title">
              <span>{{item.payload.title}}</span>
            </div>
            <div class="desc">
              <span>{{item.payload.description}}</span>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-lg-2 annual-movie" v-if="item.subjects" v-for="(movie, index) in item.subjects">
          <el-card class="movie-card" :body-style="{ padding: '0px' }" v-if="movie">
            <a target="_blank" :href="getMovieDetail(movie.id)"><img :src="movie.image_url" class="image"></a>
            <div style="padding: 14px;" class="info">
              <span>{{ movie.title }}</span>
              <div class="bottom clearfix">
                <time class="star">{{ movie.average }}</time>
                <span class="rank">Top.{{index + 1}}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div class="col-xs-12 col-lg-12 annual-body" v-show="web">
          <div class="col-xs-12 col-lg-4 left">
          </div>
          <div class="col-lg-4"></div>
          <div class="col-xs-12 col-lg-4 right">
            <div class="title">
              <span>{{item.payload.title}}</span>
            </div>
            <div class="desc">
              <span>{{item.payload.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import global_ from "../config/Global"
  const MOVIE_ANNUAL_URL = global_.URLS.MOVIE_ANNUAL_URL;
    export default {
      name: "",
      data() {
        return {
          page: {
            p: 1,
            count: 10,
            total: 0
          },
          body:[],
          web: true,
          year: ""
        }
      },
      methods: {
        getAnnualMovieList() {
          this.year = this.$route.params.year;
          this.$http.get(MOVIE_ANNUAL_URL + this.year, {
            headers: {
              bid: global_.FUNC.getBid()
            },
            params: {
              p: this.page.p,
              count: this.page.count
            }
          }).then( data => {
            if (data.body.code !== 200) {
              this.$message.error("数据获取失败!");
              return;
            }

            this.page.p = data.body.data.page;
            this.page.count = data.body.data.count;
            this.page.total = data.body.data.total;
            this.body = data.body.data.body;
          });
        },
        getMovieDetail(id) {
          return "/movie/subject/" + id;
        },
        checkMedia() {
          return window.matchMedia('(max-width:415px)').matches;
        }
      },
      created() {
        if (this.checkMedia()) {
          this.count = 5;
          this.web = false;
        }
        this.getAnnualMovieList();
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  img.image {
    width: 100%;
    height: 222px;
  }

  div.annual-movie {
    height: 300px;
    margin-top: 20px;
  }

  div.annual-item {
    height: 850px;
    margin-top: 50px;
    border-radius: 15px;
  }

  .star {
    color: #e09015;
  }

  span.rank {
    float: right;
  }

  .movie-card {
    /*background:#000;*/
    filter:alpha(opacity:80);
    opacity:0.8;
    -moz-opacity:0.8;
    -khtml-opacity: 0.8;
  }

  div.annual-body {
    /*border-bottom: 30px;*/
    /*background:#000;*/
    /*filter:alpha(opacity:50);*/
    /*opacity:0.5;*/
    /*-moz-opacity:0.5;*/
    /*-khtml-opacity: 0.5;*/
  }

  div.title {
    margin-top: 30px;
    padding: 0 10px;
    background-color: rgba(89, 137, 120, 0.8);
    color: #fff;
    font-size: 15px;
    text-align: center;
  }

  div.title span {
    font-size: 24px;
  }

  div.desc {
    background-color: rgba(0, 0, 0, 0.5);
    color: hsla(0,0%,100%,.6);
    padding: 10px;
  }

  div.desc span {
    font-size: 12px;
  }

  #annual-title {
    text-align: center;
  }

</style>
