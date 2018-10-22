<template>
  <el-row>
    <el-col :span="24">
      <el-col :span="4" style="width: 16.7%;height:100%;background-color: white"></el-col>
      <el-col :span="16" id="movie-body">
        <el-col :span="24">
          <h3><b>{{data.title}}</b></h3>
          <el-col :span="6">
            <a id="movie-image" target="_blank" :href="data.image_url"><img :src="image.large" /></a>
          </el-col>
          <el-col :span="12" id="movie-info">
            <div class="info" v-if="isEmpty(data.directors)">
              导演:
              <span v-for="director in data.directors">
              <a>{{ director.name }}</a>&nbsp;
            </span><br/>
            </div>
            <div class="info" v-if="isEmpty(data.writers)">
              编剧:
              <span v-for="writer in data.writers"><a>{{ writer.name }}</a>&nbsp;</span><br/>
            </div>
            <div class="info" v-if="isEmpty(data.casts)">
              主演:
              <span v-for="cast in data.casts"><a>{{ cast.name }}</a>&nbsp;</span><br/>
            </div>
            <div class="info" v-if="isEmpty(data.genres)">
              类型:
              <span v-for="genre in data.genres"
                    v-if="genre.level === 1 || genre.level === 2 || genre.level === 3">
                <span>{{ genre.name }}</span>&nbsp;
              </span><br/>
            </div>
            <div class="info" v-if="isEmpty(data.countries)">
              制片国家/地区:
              <span v-for="country in data.countries">
                <span>{{ country }}</span>&nbsp;
              </span><br/>
            </div>
            <div class="info" v-if="isEmpty(data.pubdate)">
              <span>上映时间: </span>{{ data.pubdate }}<br/>
            </div>
            <div class="info" v-if="isEmpty(data.aka)">
              又名:
              <span v-for="name in data.aka">
                <span>{{ name }}</span>&nbsp;
              </span><br/>
            </div>
            <div class="info" v-if="isEmpty(data.durations)">
              单片集长:
              <span v-for="duration in data.durations">
                <span>{{ duration }}</span>&nbsp;
              </span><br/>
            </div>
            <div class="info" v-if="isEmpty(data.year)">
              年份:
              <span>{{ data.year }}&nbsp;</span><br/>
            </div>
          </el-col>
          <el-col :span="6">
            <div id="movie-rate">
              <span>豆瓣评分: </span><br/>
              <strong><b>{{ data.average }}</b></strong>
              <el-rate
                v-model="data.average / 2"
                disabled
              >
              </el-rate>
              <span style="color: #006030">{{data.comments_count + data.reviews_count}} 人评价</span>
            </div>
          </el-col>
          <el-col :span="24" class="movie-label" id="movie-intro">
            <h4 style="color: green">内容简介  · · · · · ·</h4>
            <div v-for="summary in data.summaries">
              <p>{{summary}}</p>
            </div>
          </el-col>
          <el-col :span="24" class="movie-label">
            <h4 style="color: green">影评  · · · · · ·<span>(共{{data.reviews_count}}条)</span></h4>
            <el-col :span="24" id="movie-review" class="list-group-item" v-for="item in reviews.body" :key="item.id">
              <el-col >
                <span style="float: left">{{item.title}}&nbsp;&nbsp;<b>(共{{item.comments}}人评价)</b>&nbsp;&nbsp;&nbsp;{{item.published}}</span>
                <span class="badge">{{item.votes}}有用</span>
              </el-col>
              <p>{{item.summary}}</p>
            </el-col>
          </el-col>
          <el-col :span="24" class="movie-label">
            <h4 style="color: green">短评  · · · · · ·<span>(共{{data.comments_count}}条)</span></h4>
            <el-col :span="24" id="movie-comment" class="list-group-item" v-for="item in comments.body" :key="item.id">
              <a>{{item.author}}</a>&nbsp;
              <b style="color: orange;">
                <el-rate
                  v-model="item.stars / 2"
                  disabled class="comment-rate">
                </el-rate></b>&nbsp;&nbsp;&nbsp;{{item.created_at}}
              <a><span class="badge">{{item.useful_count}}有用</span></a>
              <p>{{item.content}}</p>
            </el-col>
            <el-col :span="24">
              <el-pagination background
                             class="comment-pagination"
                             @current-change="handleCurrentChange"
                             :current-page.sync="comments.page.page"
                             :page-size="comments.page.count"
                             layout="total, prev, pager, next"
                             :total="comments.page.total">
              </el-pagination>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="4" style="width: 16.7%;height:100%;background-color: black"></el-col>
    </el-col>
  </el-row>
</template>

<script>
  import global_ from "../config/Global"
  const movie_url = global_.URLS.DOUBAN_MOVIE;
  const comment_url = global_.URLS.MOVIE_SHORT_COMMENT_URL;
  const review_url = global_.URLS.MOVIE_REVIEW_URL;
  export default {
    name: "MovieDetail",
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getMovieComment();
      },
      getMovie() {
        let movie_id = this.$route.params.id;
        const movie_detail_url = movie_url + "subject/" + movie_id;
        this.$http.get(movie_detail_url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.data = data.body.data;
          this.image = this.data.image;
          this.comments.page.total = this.data.comments_count;
          this.reviews.page.total = this.data.reviews_count;
        });
      },
      getMovieComment() {
        let movie_id = this.$route.params.id;
        const url = comment_url + "/" + movie_id + "?p="
          + this.comments.page.page + "&count="
          + this.comments.page.count
          + "&popular=" + this.popular_comment;
        this.$http.get(url).then((data) => {
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
      getMovieReview() {
        let movie_id = this.$route.params.id;
        const url = review_url + "/" + movie_id
          + "?p=" + this.reviews.page.page
          + "&count=" + this.reviews.page.count
          + "&popular=" + this.popular_review;
        this.$http.get(url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.reviews.body = data.body.data.body;
          this.reviews.page.total = data.body.data.total;
          this.reviews.page.page = data.body.data.page;
          this.reviews.page.count = data.body.data.count;
          console.log(this.reviews.body);
          console.log(data.body.data.body);
        });
      },
      isEmpty(array) {
        if (JSON.stringify(array) === '[]') {
          return false;
        }
        return true;
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
        }
      }
    },
    created() {
      this.getMovie();
      this.getMovieReview();
      this.getMovieComment();
    }
  }
</script>

<style scoped>
  #movie_left {
    background-color: white;
  }

  .intro h4 {
    color: green;
  }

  #movie-image img {
    width: 120px;
  }

  #movie-image {
    width: 120px;
  }

  #movie-body {
    margin: 30px 0 30px 60px;
  }

  #movie-info {
    margin-top: -7px;
    margin-left: -50px;
  }

  div.info span {
    color: gray;
  }

  div.info {
    color: gray;
    margin: 3px;
  }

  div.info span {
    color: black;
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

  .movie-label {
    margin: 10px 0 10px 0;
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

  .comment-rate {
    display: inline-block;
  }

  #movie-review {
    color: #3377aa;
  }

  #movie-review p {
    color: black;
    margin: 13px 0 13px 0;
  }

  #movie-review div {
    padding-bottom: 10px;
  }

  .comment-pagination {
    margin-top: 20px;
  }

  #movie-review, #movie-comment {
    border-left: white;
    border-right: white;
    border-top: solid 1px gainsboro;
    border-bottom: solid 1px gainsboro;
  }
</style>
