<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="row">
    <div class="col-lg-12 col-xs-12" id="movie-detail">
      <div class="col-lg-1"></div>
      <div class="col-lg-8 col-xs-12" id ="movie-body">
        <h3 class="movie-title"><b>{{data.title}}</b></h3>
        <div class="col-lg-2 col-xs-3 movie-img">
          <a :href="getImage(data)" v-if="data.image_url"><img :src="data.image_url"></a>
          <a :href="getImage(data)" v-else-if="data.image"><img :src="data.image.medium"></a>
          <a :href="getImage(data)" v-else><img src="/static/image/movie_anon.jpg"></a>
          <el-button class="btn-update" v-on:click="updateMovie()">实时更新</el-button>
        </div>
        <div class="col-lg-6 col-xs-6" id="movie-info">
          <div class="info" v-if="!isEmpty(data.directors)">
            导演:
            <span v-for="director in data.directors">
                  <a>{{ director.name }}</a>&nbsp;
                </span><br/>
          </div>
          <div class="info" v-if="!isEmpty(data.writers)">
            编剧:
            <span v-for="writer in data.writers"><a><font>{{ writer.name }}</font></a>&nbsp;</span><br/>
          </div>
          <div class="info" v-if="!isEmpty(data.casts)">
            主演:
            <span v-for="(cast, index) in data.casts" :key="cast.id">
              <a>{{ cast.name }}</a>&nbsp;
            </span><br/>
          </div>
          <div class="info" v-if="!isEmpty(data.genres)">
            类型:
            <span v-for="genre in data.genres"
                  v-if="genre.level === 1 || genre.level === 2 || genre.level === 3">
              <span><font>{{ genre.name }}</font></span>&nbsp;
              </span><br/>
          </div>
          <div class="info" v-if="!isEmpty(data.countries)">
            制片国家/地区:
            <span v-for="country in data.countries">
              <span><font>{{ country }}</font></span>&nbsp;
              </span><br/>
          </div>
          <div class="info" v-if="!isEmpty(data.pubdate)">
            <span>上映时间: </span><font v-for="pubdate in data.pubdate" :key="pubdate">{{ pubdate }}&nbsp;&nbsp;</font><br/>
          </div>
          <div class="info" v-if="!isEmpty(data.aka)">
            又名:
            <span v-for="name in data.aka">
              <span><font>{{ name }}&emsp;</font></span>
              </span><br/>
          </div>
          <div class="info" v-if="!isEmpty(data.durations)">
            单片集长:
            <span v-for="duration in data.durations">
              <span><font>{{ duration }}</font></span>&nbsp;
              </span><br/>
          </div>
          <div class="info" v-if="!isEmpty(data.year)">
            年份:
            <span><font>{{ data.year }}</font>&nbsp;</span><br/>
          </div>
          <div class="info">
            <a target="_blank" style="cursor: pointer" :href="getOriginRoutes(data.id)"><img title="跳转原网页" src="/static/image/go.png" /></a>
          </div>
        </div>
        <div class="col-lg-4 col-xs-3 rate">
          <div id="movie-rate">
            <span>豆瓣评分: </span><br/>
            <strong><b>{{ data.average }}</b></strong>
            <el-rate v-model="data.average / 2" disabled></el-rate>
            <span style="color: #006030">{{data.comments_count + data.reviews_count}} 人评价</span>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 movie-label" id="movie-intro">
          <h4 style="color: green">内容简介  · · · · · ·</h4>
          <div v-show="!summary_show">
            <div v-for="(p_item, index) in data.summaries">
              <p v-if="index < 1">{{p_item}}</p>
            </div>
            <span v-on:click="summaryShowToggle()" class="summary-show" v-if="data.summaries !== undefined && data.summaries.length > 1">(展开全部)</span>
          </div>
          <div v-show="summary_show">
            <div v-for="p_item in data.summaries">
              <p>{{p_item}}</p>
            </div>
            <span v-on:click="summaryShowToggle()" class="summary-show">(收起)</span>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 movie-label"  id="movie-review-anchor">
          <h4 style="color: green">{{data.title}}的影评  · · · · · ·<span>(共{{reviews.page.total}}条)</span></h4>
          <div class="col-lg-12 col-xs-12 list-group-item movie-review" v-for="item in reviews.body" :key="item.id">
            <div>
              <!--<b>(共{{item.comments}}人评价)</b>&nbsp;&glnbsp;&nbsp;-->
              <span style="float: left;margin-right: 15px"><img :src="item.author.avatar"/></span>
              <a style="float: left" :href="gotoAuthor(item.author.id)" target="_blank" v-if="item.author">{{item.author.name}}&emsp;</a>
              <span style="float: left;color: gray" v-else>[已注销]&emsp;</span>
              <el-rate style="float: left" v-model="data.average / 2" disabled></el-rate>
              <span style="float: left;color: #999">&emsp;{{item.created_at}}</span><br>
              <span style="float: left;margin: 10px 0;"><a target="_blank" :href="gotoReview(item.id)">{{item.title}}</a>&nbsp;&nbsp;</span>
              <span class="badge" v-if="item.useful_count">{{item.useful_count}}赞</span>
            </div>
            <p>{{item.summary}}</p>
          </div>
          <div class="col-lg-12 col-xs-12">
            <el-pagination background
                           class="comment-pagination"
                           @current-change="handleReviewCurrentChange"
                           :current-page.sync="reviews.page.page"
                           :page-size="reviews.page.count"
                           :small="checkMedia()"
                           :pager-count="pager_count"
                           layout="total, prev, pager, next"
                           :total="reviews.page.total">
            </el-pagination>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 movie-label" id="movie-comment-anchor">
          <h4 style="color: green">{{data.title}}的短评  · · · · · ·<span>(共{{comments.page.total}}条)</span></h4>
          <div class="col-lg-12 col-xs-12 list-group-item movie-comment" v-for="item in comments.body" :key="item.id">
            <span style="float: left;margin-right: 10px;" v-if="item.author"><img style="width: 24px" :src="item.author.avatar"></span>
            <a style="float: left;" target="_blank" :href="gotoAuthor(item.author.id)" v-if="item.author">{{item.author.name}}&emsp;</a>
            <a style="float: left;" href="#" v-else>[已注销]</a>&emsp;
            <el-rate style="float: left" v-model="data.average / 2" disabled></el-rate>&emsp;
            <span style="float: left;color: #999">&emsp;{{item.created_at}}</span>
            <a><span class="badge">{{item.useful_count}}赞</span></a>
            <p class="comment-sumary">{{item.content}}</p>
          </div>
          <div class="col-lg-12 col-xs-12">
            <el-pagination background
                           class="comment-pagination"
                           @current-change="handleCommentCurrentChange"
                           :current-page.sync="comments.page.page"
                           :page-size="comments.page.count"
                           :pager-count="pager_count"
                           :small="checkMedia()"
                           layout="total, prev, pager, next"
                           :total="comments.page.total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  const movie_url = global_.URLS.DOUBAN_MOVIE;
  const comment_url = global_.URLS.MOVIE_SHORT_COMMENT_URL;
  const review_url = global_.URLS.MOVIE_REVIEW_URL;
  export default {
    name: "MovieDetail",
    methods: {
      getImage(data) {
        if (data.image_url) {
          return data.image_url;
        } else if (data.image) {
          return data.image.medium;
        } else {
          return "";
        }
      },
      handleCommentCurrentChange(val) {
        this.comments.page.page = val;
        this.getMovieComment();

        this.goAnchor("#movie-comment-anchor");
      },
      handleReviewCurrentChange(val) {
        this.reviews.page.page = val;
        this.getMovieReview();

        this.goAnchor("#movie-review-anchor");
      },
      getMovie() {
        let movie_id = this.$route.params.id;
        const movie_detail_url = movie_url + "subject/" + movie_id;
        this.$http.get(movie_detail_url, {
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.data = data.body.data;
          this.image = this.data.image;
        });
      },
      updateMovie() {
        let movie_id = this.$route.params.id;
        let update_movie_url = movie_url + "update/" + movie_id;
        this.$http.get(update_movie_url, {
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            this.$message.error("数据更新错误,请稍后再试!");
            return;
          }

          this.data = data.body.data;
          this.$message({
            message: "数据更新成功!",
            type: 'success'
          });
        });
      },
      getMovieComment() {
        let movie_id = this.$route.params.id;
        const url = comment_url + movie_id;
        this.$http.get(url, {
          params:{
            p:this.comments.page.page,
            count:this.comments.page.count
          },
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.comments.body = data.body.data.body;
          this.comments.page.total = data.body.data.total;
          this.comments.page.page = data.body.data.page;
          this.comments.page.count = data.body.data.count;
        });
      },
      getOriginRoutes(id) {
        return "https://movie.douban.com/subject/" + id;
      },
      gotoAuthor(id) {
        return "https://www.douban.com/people/" + id;
      },
      getMovieReview() {
        let movie_id = this.$route.params.id;
        const url = review_url + movie_id;
        this.$http.get(url, {
          params:{
            p:this.reviews.page.page,
            count:this.reviews.page.count
          },
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.reviews.body = data.body.data.body;
          this.reviews.page.total = data.body.data.total;
          this.reviews.page.page = data.body.data.page;
          this.reviews.page.count = data.body.data.count;
        });
      },
      isEmpty(array) {
        return array === null || array === undefined || array.length === 0;
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
      summaryShowToggle() {
        this.summary_show = !this.summary_show;
      },
      goAnchor(query) {
        let anchor = this.$el.querySelector(query)
        document.documentElement.scrollTop = anchor.offsetTop
      },
      gotoReview(id) {
        return "https://movie.douban.com/review/" + id;
      }
    },
    data() {
      return {
        popular_comment: 0,
        popular_review: 1,
        data: {},
        image: {},
        comments: {
          body:[],
          page:{
            total: 0,
            page: 1,
            count: 20
          }
        },
        reviews: {
          body:[],
          page:{
            total: 0,
            page: 1,
            count: 5
          }
        },
        pager_count: 7,
        summary_show: false
      }
    },
    created() {
      if (this.checkMedia()) {
        this.pager_count = 5;
      }
      this.getMovie();
      this.getMovieReview();
      this.getMovieComment();
    }
  }
</script>

<style scoped>
  div.movie-img {
    padding-right: 0;
    padding-left: 0;
  }

  div.movie-img img {
    width: 105%;
  }

  .intro h4 {
    color: green;
  }

  div.info span {
    color: gray;
  }

  div.info {
    color: gray;
    margin: 3px;
  }

  #movie-rate {
    border-left: solid 1px grey;
    height: 150px;
  }

  #movie-rate {
    padding-left: 10px;
  }

  #movie-rate b {
    font-size: 45px;
  }

  div.movie-label {
    margin: 30px 0 10px 0;
  }

  #movie-intro {
    margin-top: 50px;
  }

  #movie-intro p {
    text-indent: 2em;
  }

  .movie-label h4 span {
    color: #3377aa;
    font-size: 17px;
  }

  .list-group-item span {
    float: right;
  }

  .list-group-item p {
    margin: 5px 0 5px 0;
  }

  .movie-review {
    color: #3377aa;
  }

  .movie-review p {
    color: black;
    margin: 13px 0 13px 0;
  }

  .movie-review div {
    padding-bottom: 10px;
  }

  .comment-pagination {
    margin-top: 20px;
  }

  .movie-review,.movie-comment {
    border-left: white;
    border-right: white;
    border-top: solid 1px gainsboro;
    border-bottom: solid 1px gainsboro;
  }

  font {
    color: #111;
  }

  div.movie-extra-rate {
    margin-top: 5px;
  }

  span.summary-show {
    font-size: 14px;
    color: #3377aa;
  }

  span.summary-show:hover {
    cursor: pointer;
  }

  .btn-update {
    font-size: 12px;
    margin-top: 10px;
  }

  p.comment-sumary {
    margin-top: 15px;
  }

  @media screen and (max-width: 415px) {
    div#movie-detail {
      padding-left: 0;
      padding-right: 0;
    }

    .movie-title {
      font-size: 18px;
    }

    div#movie-info {
      font-size: 12px;
      padding-left: 7px;
      padding-right: 5px;
    }

    div#movie-rate {
      font-size: 10px;
    }

    div#movie-rate b {
      font-size: 24px;
    }

    div.rate {
      padding-right: 0;
      padding-left: 0;
    }

    div.movie-label, div.movie-comment,div.movie-review {
      padding-left: 0;
      padding-right: 0;
    }

    div.movie-label h4 {
      font-size: 16px;
    }

    div.movie-label span {
      font-size: 14px;
    }

    span.summary-show {
      font-size: 12px;
      color: #3377aa;
    }

  }
</style>
