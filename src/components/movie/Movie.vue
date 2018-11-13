<template>
  <div class="container" style="text-align: center">
    <div class="row">
      <div class="col-xs-12 col-lg-12 body">
        <div class="col-xs-12 col-lg-8" id="in-theaters">
          <div class="col-lg-12 col-xs-12 movie-title">
            <b>正在热映</b>
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page.sync="in_theaters_page.page"
                           :page-size="in_theaters_page.count"
                           :small="checkMedia()"
                           layout="prev, next"
                           :total="in_theaters_page.total">
            </el-pagination>
          </div>
          <div class="col-lg-2 col-xs-4 new-movie" v-for="(item, index) in movie_in_theaters">
            <div class="movie-img" :id="item.id">
              <router-link :to="getMovieDetail(item.id)" v-if="item.image === null"><img src=""></router-link>
              <router-link :to="getMovieDetail(item.id)" v-else><img :src="item.image.medium"></router-link>
            </div>
            <div class="movie-info">
              <span class="book-info-title"><router-link :to="getMovieDetail(item.id)" append>{{item.title}}</router-link></span>
              <span class="book-info-rate" v-if="item.average">豆瓣评分:{{item.average}}</span>
              <span class="book-info-rate" v-else="item.average">暂无评分</span>
            </div>
            <br/>
          </div>
        </div>
        <!--<div class="col-xs-12 col-lg-4" id="hot-tag">-->
          <!--<span><h2>热门标签&emsp;&emsp;<router-link to="/book/tag"><b>更多>></b></router-link></h2></span><hr>-->
          <!--<div class="col-lg-12 col-xs-12" v-for="item in hot_tags">-->
            <!--<span>{{item.tag_name}}</span>-->
            <!--<el-tag type="info" class="hot-tag-info" size="medium" :key="index" v-for="(tag, index) in item.children" v-if="index <= 7">-->
              <!--<router-link tag="a" :to="gotoTag(item.id)" append>{{tag.tag_name}}</router-link>-->
            <!--</el-tag>-->
            <!--<br/>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="col-xs-12 col-lg-8" id="good-market">-->
          <!--<div class="col-lg-12 col-xs-12 book-title">-->
            <!--<b>畅销图书榜</b>-->
            <!--<el-pagination background-->
                           <!--@current-change="handleCurrentChange2"-->
                           <!--:current-page.sync="good_market_page.page"-->
                           <!--:page-size="good_market_page.count"-->
                           <!--:small="checkMedia()"-->
                           <!--layout="prev, next"-->
                           <!--:total="good_market_page.total">-->
            <!--</el-pagination>-->
          <!--</div><hr>-->
          <!--<div class="col-lg-2 col-xs-3 good-market" v-for="item in book_good_market">-->
            <!--<div class="book-img" :id="item.id">-->
              <!--<router-link :to="getBookDetail(item.id)" append v-if="item.image_url"><img :src="item.image_url"></router-link>-->
              <!--<router-link :to="getBookDetail(item.id)" append v-else><img :src="item.image.medium"></router-link>-->
            <!--</div>-->
            <!--<div class="book-info">-->
              <!--<span class="book-info-title"><router-link :to="getBookDetail(item.id)" append>{{item.name}}</router-link></span>-->
              <!--<span class="book-info-author">{{item.authors[0]}}</span>-->
            <!--</div>-->
            <!--<br/>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="col-xs-12 col-lg-4" id="book-top250">-->
          <!--<span><h2>图书 Top 250 &emsp;<router-link to="top250" append><b>更多>></b></router-link></h2></span><hr>-->
          <!--<div class="col-lg-12 col-xs-12 top250 list-group-item" v-for="(item, index) in book_top250">-->
            <!--<span class="book-info-title">{{index + 1}}.<router-link :to="getBookDetail(item.id)" append>{{item.name}}</router-link></span><br/>-->
            <!--<span class="book-info-author" v-for="author in item.authors">{{author}}&emsp;</span>-->
          <!--</div>-->
        <!--</div>-->
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
        in_theaters_page:{}
      };
    },
    methods: {
      getMovieList(type, p, count) {
        this.$http.get(MOVIE_URL + type + "?p=" + p + "&count=" + count).then( (data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.movie_in_theaters = data.body.data.body;
          this.in_theaters_page.page = data.body.data.page;
          this.in_theaters_page.count = count;
          this.in_theaters_page.total = data.body.data.total;
        });
      },
      handleCurrentChange(val) {
        this.in_theaters_page.page = val;
        this.getMovieList("IN_THEATERS", val, this.in_theaters_page.count);
      },
      getMovieDetail(id) {
        return "subject/" + id;
      },
      gotoTag(id) {
        return "/book/tag/" + id;
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
    },
    created() {
      let result = this.checkMedia();
      let count = 10;
      if (result) {
        count = 6;
      }
      this.getMovieList("IN_THEATERS", 1, count);
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

  div {
    text-align: center;
  }

  div.movie-title {
    text-align: left;
  }

  div.body, div#in-theaters {
    padding-left: 0;
    padding-right: 0;
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

    div.new-movie {
    }

    div.movie-info span {
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space:nowrap;
      display:block;
    }
  }

</style>
