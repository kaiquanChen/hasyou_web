<template>
  <div class="container" style="text-align: center">
    <div class="row">
      <div class="col-xs-12 col-lg-8 body">
        <div class="col-xs-12 col-lg-12 home-movie" id="in-theaters">
          <div class="col-lg-12 col-xs-12 movie-title">
            <b>正在热映</b>
            <span class="page-show">({{in_theaters_page.page}} / {{Math.ceil(in_theaters_page.total / in_theaters_page.count)}})</span>
            <el-pagination background
                           @current-change="handleInTheatersChange"
                           :current-page.sync="in_theaters_page.page"
                           :page-size="in_theaters_page.count"
                           :small="checkMedia()"
                           layout="prev, next"
                           :total="in_theaters_page.total">
            </el-pagination>
          </div>
          <div class="col-lg-2 col-xs-4 new-movie" v-for="(item, index) in movie_in_theaters">
            <div class="movie-img" :id="item.id">
              <router-link :to="getMovieDetail(item.id)" append v-if="item.image_url"><img :src="item.image_url"></router-link>
              <router-link :to="getMovieDetail(item.id)" append v-else-if="item.image"><img :src="item.image.medium"></router-link>
              <router-link :to="getMovieDetail(item.id)" append v-else><img src=""></router-link>
            </div>
            <div class="movie-info">
              <span class="movie-info-title"><router-link :to="getMovieDetail(item.id)" append>{{item.title}}</router-link></span>
              <span class="movie-info-rate" v-if="item.average">豆瓣评分:<b class="average">{{item.average}}</b></span>
              <span class="movie-info-rate" v-else="item.average">暂无评分</span>
            </div>
            <br/>
          </div>
        </div>
        <div class="col-xs-12 col-lg-12 home-movie" id="coming-soon">
          <div class="col-lg-12 col-xs-12 movie-title">
            <b>即将上映</b>
            <span class="page-show">({{coming_soon_page.page}} / {{Math.ceil(coming_soon_page.total / coming_soon_page.count)}})</span>
            <el-pagination background
                           @current-change="handleComingSoonCurrentChange"
                           :current-page.sync="coming_soon_page.page"
                           :page-size="coming_soon_page.count"
                           :small="checkMedia()"
                           layout="prev, next"
                           :total="coming_soon_page.total">
            </el-pagination>
          </div>
          <div class="col-lg-2 col-xs-4 new-movie" v-for="(item, index) in movie_coming_soon">
            <div class="movie-img" :id="item.id">
              <router-link :to="getMovieDetail(item.id)" append v-if="item.image_url"><img :src="item.image_url"></router-link>
              <router-link :to="getMovieDetail(item.id)" append v-else-if="item.image"><img :src="item.image.medium"></router-link>
              <router-link :to="getMovieDetail(item.id)" append v-else><img src=""></router-link>
            </div>
            <div class="movie-info">
              <span class="movie-info-title"><router-link :to="getMovieDetail(item.id)" append>{{item.title}}</router-link></span>
              <span class="movie-info-rate" v-if="item.average">豆瓣评分:<b class="average">{{item.average}}</b></span>
              <span class="movie-info-rate" v-else="item.average">暂无评分</span>
            </div>
            <br/>
          </div>
        </div>
        <div class="col-xs-12 col-lg-12 home-movie" id="new-movies">
          <div class="col-lg-12 col-xs-12 movie-title">
            <b>最新电影</b>
            <span class="page-show">({{new_page.page}} / {{Math.ceil(new_page.total / new_page.count)}})</span>
            <el-pagination background
                           @current-change="handleNewMoviesCurrentChange"
                           :current-page.sync="new_page.page"
                           :page-size="new_page.count"
                           :small="checkMedia()"
                           layout="prev, next"
                           :total="new_page.total">
            </el-pagination>
          </div>
          <div class="col-lg-2 col-xs-4 new-movie" v-for="(item, index) in movie_new">
            <div class="movie-img" :id="item.id">
              <router-link :to="getMovieDetail(item.id)" append v-if="item.image_url"><img :src="item.image_url"></router-link>
              <router-link :to="getMovieDetail(item.id)" append v-else-if="item.image"><img :src="item.image.medium"></router-link>
              <router-link :to="getMovieDetail(item.id)" append v-else><img src=""></router-link>
            </div>
            <div class="movie-info">
              <span class="movie-info-title"><router-link :to="getMovieDetail(item.id)" append>{{item.title}}</router-link></span>
              <span class="movie-info-rate" v-if="item.average">豆瓣评分:<b class="average">{{item.average}}</b></span>
              <span class="movie-info-rate" v-else="item.average">暂无评分</span>
            </div>
            <br/>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-lg-4">
        <div class="col-xs-12 col-lg-12" id="weekly">
          <span><h2>一周口碑榜 &emsp;</h2></span>
          <div class="col-lg-12 col-xs-12 weekly list-group-item" v-for="(item, index) in movie_weekly">
            <span class="movie-info-title">{{index + 1}}.<router-link :to="getMovieDetail(item.id)" append>
              {{item.title}}&emsp;<font class="star">{{item.average}}</font>
            </router-link></span><br/>
          </div>
        </div>
        <div class="col-xs-12 col-lg-12" id="top250">
          <span><h2>电影TOP250 &emsp;<router-link to="top250" append><b>更多>></b></router-link></h2></span>
          <div class="col-lg-12 col-xs-12 top250 list-group-item" v-for="(item, index) in movie_top250">
            <span class="movie-info-title">{{index + 1}}.<router-link :to="getMovieDetail(item.id)" append>
              {{item.title}}&emsp;<font class="star">{{item.average}}</font>
            </router-link></span><br/>
          </div>
        </div>
        <div class="col-xs-12 col-lg-12" id="us-box">
          <span class="us-box-title"><h2>北美票房榜 &emsp;</h2></span>
          <div class="col-lg-12 col-xs-12 us-box list-group-item" v-for="(item, index) in movie_us_box">
            <span class="movie-info-title">{{index + 1}}.
              <router-link :to="getMovieDetail(item.id)" append>{{item.title}}</router-link>
              <span class="extra">{{item.movie_tag.vars.box / 10000}}万$</span>
            </span><br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  const MOVIE_URL = global_.URLS.DOUBAN_MOVIE;
  export default {
    name: "movie",
    data() {
      return {
        movie_in_theaters:[],
        movie_coming_soon:[],
        movie_new:[],
        movie_weekly:[],
        movie_top250:[],
        movie_us_box:[],
        coming_soon_page:{
          total:0,
          page:1,
          count:10
        },
        in_theaters_page:{
          total:0,
          page:1,
          count:10
        },
        new_page:{
          total:0,
          page:1,
          count:10
        },
        movie_data:{}
      };
    },
    methods: {
      getMovieList(type, p, count) {
        this.$http.get(MOVIE_URL + type, {
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then( (data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.movie_data[type] = data.body.data;
          for (let i = 0; i < count; i++) {
            if (type === "IN_THEATERS") {
              this.movie_in_theaters[i] = data.body.data[i];
              this.in_theaters_page.page = 1;
              this.in_theaters_page.count = count;
              this.in_theaters_page.total = data.body.data.length;
            } else if (type === "COMING_SOON") {
              this.movie_coming_soon[i] = data.body.data[i];
              this.coming_soon_page.page = 1;
              this.coming_soon_page.count = count;
              this.coming_soon_page.total = data.body.data.length;
            } else if (type === "NEW_MOVIES") {
              this.movie_new[i] = data.body.data[i];
              this.new_page.page = 1;
              this.new_page.count = count;
              this.new_page.total = data.body.data.length;
            } else if (type === "WEEKLY" && i < data.body.data.length) {
              this.movie_weekly[i] = data.body.data[i];
            } else if (type === "US_BOX" && i < data.body.data.length) {
              this.movie_us_box[i] = data.body.data[i];
            }
          }
        });
      },
      getMovieTop250() {
        this.$http.get(MOVIE_URL + "top250", {
          params: {
            p: 1,
            count: 10
          },
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then( (data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.movie_top250 = data.body.data.body;
        });
      },
      handleInTheatersChange(val) {
        this.movie_in_theaters = [];
        this.in_theaters_page.page = val;
        let start = (val - 1) * this.in_theaters_page.count;
        for (let j = 0; j < this.in_theaters_page.count && start < this.movie_data["IN_THEATERS"].length; start++) {
          this.movie_in_theaters[j++] = this.movie_data["IN_THEATERS"][start];
        }
      },
      handleNewMoviesCurrentChange(val) {
        this.movie_new = [];
        this.new_page.page = val;
        let start = (val - 1) * this.new_page.count;
        for (let j = 0; j < this.new_page.count && start < this.movie_data["NEW_MOVIES"].length; start++) {
          this.movie_new[j++] = this.movie_data["NEW_MOVIES"][start];
        }
      },
      handleComingSoonCurrentChange(val) {
        this.movie_coming_soon = [];
        this.coming_soon_page.page = val;
        let start = (val - 1) * this.coming_soon_page.count;
        for (let j = 0; j < this.coming_soon_page.count && start < this.movie_data["COMING_SOON"].length; start++) {
          this.movie_coming_soon[j++] = this.movie_data["COMING_SOON"][start];
        }
      },
      getMovieDetail(id) {
        return "subject/" + id;
      },
      gotoTag(id) {
        return "/book/tag/" + id;
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      }
    },
    created() {
      let result = this.checkMedia();
      let count = 12;
      if (result) {
        this.count = 6;
      }
      this.getMovieList("IN_THEATERS", 1, count);
      this.getMovieList("COMING_SOON", 1, count);
      this.getMovieList("NEW_MOVIES", 1, count);
      this.getMovieList("WEEKLY", 1, 12);
      this.getMovieList("US_BOX", 1, 12);
      this.getMovieTop250();
    }
  }
</script>

<style scoped>

  div.movie-title {
    margin: 5px 0 15px 0;
    padding-bottom: 4px;
    border-bottom: grey 1px solid;
  }

  div.movie-title b {
    font-size: 24px;
  }

  div.new-movie {
    height: 230px;
  }

  div.movie-img img {
    width: 115px;
    height: 172px;
  }

  div.new-movie {
    padding-left: 5px;
  }

  div.el-pagination {
    float: right;
  }

  span.page-show {
    color: #666;
  }

  div.movie-title {
    text-align: left;
  }

  span.us-box-title {
    text-align: left;
  }

  div.body, div#in-theaters, div#coming-soon, div#new-movies {
    padding-left: 0;
    padding-right: 0;
  }

  div.movie-info {
    margin-top: 5px;
  }

  div.movie-info span {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    width: 115px;
    display:block;
  }

  b.average {
    color: #e09015;
  }

  div.home-movie, div#weekly{
    margin-top: 30px;
  }

  div#weekly, div#top250, div#us-box {
    text-align: left;
    margin: 10px 0;
  }

  div#weekly h2, div#top250 h2, div#us-box h2 {
    font-size: 20px;
  }

  div#weekly b, div#top250 b {
    font-size: 14px;
  }

  div.weekly, div.top250, div.us-box {
    text-align: left;
    border: 1px solid #eaeaea;
    border-left: white;
    border-right: white;
  }

  span.extra {
    color: #494949;
    font-size: 13px;
    float: right;
  }

  div.top250 font, div#weekly font {
    color: #e09015;
    float: right;
  }

  @media screen and (max-width: 415px) {

    div#in-theaters {
      padding-right: 0;
    }

    div#in-theaters>span>h2 {
      font-size: 20px;
    }

    div.new-movie {
      height: 225px;
    }

    div.book-img img {
      width: 105px;
      height: 142px;
    }

    div.movie-info span {
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space:nowrap;
      display:block;
    }

    div#weekly, div#top250, div#us-box {
      padding-left: 0;
      padding-right: 0;
    }
  }

</style>
