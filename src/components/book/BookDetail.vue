<template>
  <el-row>
    <el-col :span="24">
      <el-col :span="4" style="width: 16.7%;height:100%;background-color: white"></el-col>
      <el-col :span="16" id="book-body">
        <el-col :span="24">
          <h3><b>{{data.name}}</b></h3>
          <el-col :span="6">
            <a id="book-image" target="_blank" :href="data.image_url"><img :src="data.image_url" /></a>
          </el-col>
          <el-col :span="12" id="book-info">
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
          </el-col>
          <el-col :span="6">
            <div id="book-rate">
              <span>豆瓣评分: </span><br/>
              <strong><b>{{ data.stars }}</b></strong>
              <el-rate
                v-model="data.stars / 2"
                disabled
              >
              </el-rate>
              <span style="color: #006030">{{data.comments_count + data.reviews_count}} 人评价</span>
            </div>
          </el-col>
          <el-col :span="24" class="book-label" id="book-intro">
            <h4 style="color: green">内容简介  · · · · · ·</h4>
            <div v-for="p_item in data.intro">
              <p>{{p_item}}</p>
            </div>
          </el-col>
          <el-col :span="24" class="book-label" id="book-category">
            <h4 style="color: green">目录  · · · · · ·</h4>
            <div v-for="category in data.category"><span>{{category}}</span></div>
          </el-col>
          <el-col :span="24" class="book-label">
            <h4 style="color: green">书评  · · · · · ·<span>(共{{data.reviews_count}}条)</span></h4>
            <el-col :span="24" id="book-review" class="list-group-item" v-for="item in reviews.body" :key="item.id">
              <el-col >
                <span style="float: left">{{item.title}}&nbsp;&nbsp;<b>(共{{item.comments}}人评价)</b>&nbsp;&nbsp;&nbsp;{{item.published}}</span>
                <span class="badge">{{item.useless}}无用</span>
                <span class="badge">{{item.votes}}有用</span>
              </el-col>
              <p>{{item.summary}}</p>
            </el-col>
          </el-col>
          <el-col :span="24" class="book-label">
            <h4 style="color: green">短评  · · · · · ·<span>(共{{data.comments_count}}条)</span></h4>
            <el-col :span="24" id="book-comment" class="list-group-item" v-for="item in comments.body" :key="item.id">
              <a>{{item.creator_name}}</a>&nbsp;
              <b style="color: orange;">
                <el-rate
                v-model="item.stars / 2"
                disabled class="comment-rate">
              </el-rate></b>&nbsp;&nbsp;&nbsp;{{item.create_time}}
              <a><span class="badge">{{item.votes}}有用</span></a>
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
  const book_url = global_.URLS.BOOK_URL;
  const comment_url = global_.URLS.SHORT_COMMENT_URL;
  const review_url = global_.URLS.BOOK_REVIEW_URL;
  export default {
    name: "BookList",
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getBookComment();
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
        if (JSON.stringify(array) === '[]') {
          return false;
        }
        return true;
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
        }
      }
    },
    created() {
      this.getBook();
      this.getBookReview();
      this.getBookComment();
    }
  }
</script>

<style scoped>
  .intro h4 {
    color: green;
  }

  #book-image img {
    width: 120px;
  }

  #book-image {
    width: 120px;
  }

  #book-body {
    margin: 30px 0 30px 60px;
  }

  #book-info {
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

  .book-label {
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

  #book-review {
    color: #3377aa;
  }

  #book-review p {
    color: black;
    margin: 13px 0 13px 0;
  }

  #book-review div {
    padding-bottom: 10px;
  }

  .comment-pagination {
    margin-top: 20px;
  }

  #book-review,#book-comment {
    border-left: white;
    border-right: white;
    border-top: solid 1px gainsboro;
    border-bottom: solid 1px gainsboro;
  }

</style>
