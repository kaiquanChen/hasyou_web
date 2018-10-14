<template>
  <el-row id="post-index">
    <el-col>
      <h1 style="text-align: center">有你论坛</h1>
    </el-col>
    <el-col :span="3" id="post-left">
nothing!
    </el-col>
    <el-col :span="18" id="post-body">
      <div class="col-sm-12 post-header">
        <div class="col-sm-10">
          <!-- nav -->
          <div class="nav">
            <router-link to="/forum"><b>论坛首页</b></router-link>&nbsp;&nbsp;>&nbsp;
            <router-link to="#"><b>{{node.title}}</b></router-link>
          </div>
          <span class="post-title">{{post.title}}</span><br>
          <span class="post-author"><a href="#"><b>{{post.member.username}}</b></a>&nbsp;<b> ·    {{post.create_time}}</b></span>
        </div>
        <div class="col-sm-2 img-div">
          <!-- member avatar-->
          <a href="#"><img class="img-rounded" :src="member.avatar_large"></a>
        </div>
      </div>
      <div class="col-sm-12 post-content">
        <div class="col-sm-12">
          <div class="markdown" v-html="content"></div>
        </div>
        <div class="col-sm-12 post-content-bottom">
          <a>加入收藏</a>
          <a>忽略主题</a>
        </div>
      </div>

      <div class="col-sm-12 post-comment">
        <div class="col-sm-12 post-comment-header">
          <span>
            {{post.comment_count}}&nbsp;&nbsp;回复&nbsp;&nbsp;<strong>|</strong>&nbsp;&nbsp;直到&nbsp;&nbsp;{{post.active_time}}
          </span>
          <span class="post-comment-node">
            <router-link to="#"><b>{{node.title}}</b></router-link>
          </span>
        </div>
        <div class="col-sm-12" id="pagination-top">
          <el-pagination background
                         @current-change="handleCurrentChange"
                         :current-page.sync="comment.page.page"
                         :page-size="comment.page.count"
                         layout="prev, pager, next"
                         :total="comment.page.total">
          </el-pagination>
        </div>
        <div class="col-sm-12 list-group-item post-comment-body" v-for="comment in comment.body">
          <div class="col-sm-1 post-comment-body-img" v-if="comment.member">
            <a><img class="img-rounded" :src="comment.member.avatar_large" :id="comment.member.id"></a>
          </div>
          <div class="col-sm-1 post-comment-body-img" v-else>
            <a><img class="img-rounded" src="/static/image/user_anon.jpeg"></a>
          </div>
          <div class="col-sm-11 post-comment-body-info">
            <span class="comment-foor-number badge">{{comment.floor_number}}</span>
            <strong class="comment-username">{{comment.author}}</strong>&nbsp;&nbsp;
            <span class="comment-time">{{comment.create_time}}</span>&nbsp;&nbsp;
            <span class="comment-device" v-if="isWeb(comment.device)">via &nbsp;&nbsp;{{comment.device}}</span>
            <div class="comment-content">
              <span>{{comment.content}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12" id="pagination-bottom">
        <el-pagination background
                       @current-change="handleCurrentChange"
                       :current-page.sync="comment.page.page"
                       :page-size="comment.page.count"
                       layout="total, prev, pager, next"
                       :total="comment.page.total">
        </el-pagination>
      </div>
    </el-col>
    <el-col :span="3" id="post-right">
    </el-col>
  </el-row>
</template>

<script>
  let marked = require('marked');
  import global_ from "../config/Global"
  const post_url = global_.URLS.POST_URL;
  const comment_url = global_.URLS.COMMENT_URL;
  export default {
    data() {
      return {
        post:{},
        member:{},
        node:{},
        content: "",
        comment: {
          page:{
            total: 0,
            page: 1,
            count: 20
          },
          body:[]

        }
      };
    },
    methods: {
      getPost() {
        let post_id = this.$route.params.id;
        let url = post_url + "subject/" + post_id;
        this.$http.get(url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.post = data.body.data;
          this.member = this.post.member;
          this.node = this.post.node;
          this.content = marked(this.post.content, { sanitize: true });
        });
      },
      getComments() {
        let post_id = this.$route.params.id;
        let url = comment_url + post_id + "?p="
          + this.comment.page.page + "&count="
          + this.comment.page.count;
        this.$http.get(url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.comment.body = data.body.data.body;
          this.comment.page.page = data.body.data.page;
          this.comment.page.count = data.body.data.count;
          this.comment.page.total = data.body.data.total;
        });
      },
      handleCurrentChange(val) {
        this.comment.page.page = val;
        this.getComments();
      },
      isWeb(device) {
        return device !== "Web";
      },
      isEmpty(obj) {
        alert(obj != null);
        return obj != null;
      }
    },
    created() {
      this.getPost();
      this.getComments();
    }
  };
</script>

<style scoped>
  #post-left, #post-right {
    color: white;
  }

  #post-index {
    background-color: #F8F8F8;
  }

  .post-header {
    background-color: white;
    border-bottom: black solid 1px;
  }

  .post-content {
    background-color: white;
  }

  .post-header span {
    font-weight:bold;
    color:black;
    font-size: 25px;
  }

  .img-div img {
    width: 59px;
    padding-top: 20px;
  }

  .img-div {
    float: right;
  }

  .post-content {
    padding: 30px 0 0 0;
    overflow: visible;
  }

  .nav {
    padding: 10px 0 20px 0;
  }

  .nav b {
    color: #778087;
  }

  .post-content-bottom {
    height: 30px;
    background: #e2e2e2;
    border-radius: 0 0 5px 5px;
  }

  .post-content-bottom a {
    margin: 0 50px 0 0;
    color: black;
  }

  .post-comment {
    margin: 30px 0;
    background: white;
    border-radius: 3px;
  }

  .post-comment-header span {
    color: grey;
  }

  .post-comment-header {
    padding: 10px 0 10px 0;
  }

  .post-comment-node {
    float: right;
  }

  .post-comment-node b {
    color: #778087;
    margin-left: 10px;
  }

  .post-comment-body {
    border-left: white;
    border-right: white;
    border-bottom: white;
  }

  .post-comment-body-img {
    padding: 0;
    margin-right: -20px;
  }

  .post-comment-body-img img {
    width: 48px;
  }

  .comment-username {
    color: grey;
  }

  .comment-time,.comment-device {
    color: #ccc;
  }

  .comment-content {
    margin: 7px 0;
  }

  .comment-foor-number {
    float: right;
    margin-right: -50px;
  }

  .markdown {
    margin-bottom: 20px;
  }

  #pagination-top {
    padding: 10px 0 15px 0;
    border-top: solid 1px grey;
  }

  .post-author b {
    color: grey;
    font-size: 15px;
  }
</style>
