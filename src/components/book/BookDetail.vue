<template>
  <div class="row">
    <div class="col-lg-12 col-xs-12" id="book-detail">
      <div class="col-lg-1"></div>
      <div class="col-lg-8 col-xs-12" id ="book-body">
        <h3 class="book-title"><b>{{data.name}}</b></h3>
        <div class="col-lg-2 col-xs-2 book-img">
          <a target="_blank" :href="data.image_url"><img :src="data.image_url" /></a>
        </div>
        <div class="col-lg-6 col-xs-5" id="book-info">
          <div class="info" v-if="isEmpty(data.authors)">
            作者:
            <span v-for="author in data.authors">
              <a>{{ author }}</a>&nbsp;
            </span><br/>
          </div>
          <div class="info" v-if="isEmpty(data.translators)">
            译者:
            <span v-for="translator in data.translators"><a>{{ translator }}</a>&nbsp;</span><br/>
          </div>
          <div class="info" v-if="data.publisher">
            <span>出版社: </span>{{ data.publisher }}<br/>
          </div>
          <div class="info" v-if="data.publish_time">
            <span>出版时间: </span>{{ data.publish_time }}<br/>
          </div>
          <div class="info" v-if="data.page_count">
            <span>总页数: </span>{{ data.page_count }}<br/>
          </div>
          <div class="info" v-if="data.price">
            <span>价格: </span>{{ data.price }}<br/>
          </div>
          <div class="info" v-if="data.origin_work_name">
            <span>原名: </span>{{ data.origin_work_name }}<br/>
          </div>
          <div class="info" v-if="data.binding">
            <span>装帧: </span>{{ data.binding }}<br/>
          </div>
        </div>
        <div class="col-lg-4 col-xs-5 rate">
          <div id="book-rate">
            <span>豆瓣评分: </span><br/>
            <strong><b>{{ data.stars }}</b></strong>
            <el-rate v-model="data.stars / 2" disabled></el-rate>
            <span style="color: #006030">{{data.comments_count + data.reviews_count}} 人评价</span>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 book-label" id="book-intro">
          <h4 style="color: green">内容简介  · · · · · ·</h4>
          <div v-for="p_item in data.intro">
            <p>{{p_item}}</p>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 book-label" id="book-category">
          <h4 style="color: green">目录  · · · · · ·</h4>
          <div class="catalog" v-for="category in data.category"><span>{{category}}</span></div>
        </div>
        <div class="col-lg-12 col-xs-12 book-label">
          <h4 style="color: green">书评  · · · · · ·<span>(共{{data.reviews_count}}条)</span></h4>
          <div class="col-lg-12 col-xs-12 list-group-item book-review" v-for="item in reviews.body" :key="item.id">
            <div>
              <!--<b>(共{{item.comments}}人评价)</b>&nbsp;&nbsp;&nbsp;-->
              <span style="float: left">{{item.title}}&nbsp;&nbsp;</span>{{item.published}}
              <span class="badge">{{item.useless}}无用</span>
              <span class="badge">{{item.votes}}有用</span>
            </div>
            <p>{{item.summary}}</p>
          </div>
          <div class="col-lg-12 col-xs-12">
            <el-pagination background
                           class="comment-pagination"
                           @current-change="handleCurrentChange2"
                           :current-page.sync="reviews.page.page"
                           :page-size="reviews.page.count"
                           :small="checkMedia()"
                           :pager-count="pager_count"
                           layout="total, prev, pager, next"
                           :total="reviews.page.total">
            </el-pagination>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 book-label">
          <h4 style="color: green">短评  · · · · · ·<span>(共{{data.comments_count}}条)</span></h4>
          <div class="col-lg-12 col-xs-12 list-group-item book-comment" v-for="item in comments.body" :key="item.id">
            <a>{{item.creator_name}}</a>&nbsp;
            <b style="color: orange;">
              <el-rate
                v-model="item.stars / 2"
                disabled class="comment-rate">
              </el-rate></b>&nbsp;&nbsp;&nbsp;{{item.create_time}}
            <a><span class="badge">{{item.votes}}有用</span></a>
            <p>{{item.content}}</p>
          </div>
          <div class="col-lg-12 col-xs-12">
            <el-pagination background
                           class="comment-pagination"
                           @current-change="handleCurrentChange"
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
  const book_url = global_.URLS.BOOK_URL;
  const comment_url = global_.URLS.BOOK_SHORT_COMMENT_URL;
  const review_url = global_.URLS.BOOK_REVIEW_URL;
  export default {
    name: "BookList",
    methods: {
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
      handleCurrentChange(val) {
        this.comments.page.page = val;
        this.getBookComment();
      },
      handleCurrentChange2(val) {
        this.reviews.page.page = val;
        this.getBookReview();
      },
      getBook() {
        let book_id = this.$route.params.id;
        const book_detail_url = book_url + "subject/" + book_id;
        this.$http.get(book_detail_url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.data = data.body.data;
        });
      },
      getBookComment() {
        let book_id = this.$route.params.id;
        const url = comment_url + "/" + book_id + "?p=" + this.comments.page.page + "&count=" + this.comments.page.count;
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
      getBookReview() {
        let book_id = this.$route.params.id;
        const url = review_url + "/" + book_id + "?p=" + this.reviews.page.page + "&count=" + this.reviews.page.count;
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
        });
      },
      isEmpty(array) {
        return JSON.stringify(array) !== '[]';

      }
    },
    data() {
      return {
        data: {},
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
        pager_count: 7
      }
    },
    created() {
      if (this.checkMedia()) {
        this.pager_count = 5;
      }
      this.getBook();
      this.getBookReview();
      this.getBookComment();
    }
  }
</script>

<style scoped>
  div.book-img {
    padding-right: 0;
    padding-left: 0;
  }

  div.book-img img {
    width: 105%;
  }

  div#book-info {

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

  #book-rate {
    border-left: solid 1px grey;
    height: 150px;
  }

  #book-rate {
    padding-left: 10px;
  }

  #book-rate b {
    font-size: 45px;
  }

  div.book-label {
    margin: 10px 0 10px 0;
  }

  #book-intro {
    margin-top: 50px;
  }

  #book-intro p {
    text-indent: 2em;
  }

  .book-label h4 span {
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

  .book-review {
    color: #3377aa;
  }

  .book-review p {
    color: black;
    margin: 13px 0 13px 0;
  }

  .book-review div {
    padding-bottom: 10px;
  }

  .comment-pagination {
    margin-top: 20px;
  }

  .book-review,.book-comment {
    border-left: white;
    border-right: white;
    border-top: solid 1px gainsboro;
    border-bottom: solid 1px gainsboro;
  }

  div.catalog {
    padding-left: 30px;
  }

  @media screen and (max-width: 415px) {
    div#book-detail {
      padding-left: 0;
      padding-right: 0;
    }

    .book-title {
      font-size: 18px;
    }

    div#book-info {
      font-size: 10px;
    }

    div#book-rate {
      font-size: 10px;
    }

    div#book-rate b {
      font-size: 24px;
    }

    div.rate {
      padding-right: 0;
    }

    div.book-label, div.book-comment,div.book-review {
      padding-left: 0;
      padding-right: 0;
    }

  }
</style>
