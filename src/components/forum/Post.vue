<template>
  <div class="row" id="post-index">
    <div class="col-lg-3"></div>
    <div class="col-lg-6 col-xs-12">
      <div class="col-xs-12 col-lg-12">
        <h1 style="text-align: center">有你论坛</h1>
      </div>
      <div class="col-lg-2" id="post-left"></div>
      <div class="col-xs-12 col-lg-8" id="post-body">
        <div class="col-lg-12 col-xs-12 post-header">
          <div class="col-lg-10 col-xs-9 post-header-title">
            <!-- nav -->
            <div class="nav">
              <router-link to="/forum"><b>论坛首页</b></router-link>&nbsp;&nbsp;>&nbsp;
              <router-link :to="getNodeRoutes(node.id)"><b>{{node.title}}</b></router-link>
            </div>
            <span class="post-title">{{post.title}}</span><br>
            <span class="post-author">
              <a href="#"><b>{{member.username}}</b></a>&nbsp;<b> · &nbsp;{{post.create_time}}&nbsp; · &nbsp;
              <a :href="getOriginRoutes(post.id)"><img title="跳转原网页" src="/static/image/go.png" /></a>
              </b>
            </span>
          </div>
          <div class="col-lg-2 col-xs-3 img-div">
            <!-- member avatar-->
            <a href="#"><img class="img-rounded" :src="member.avatar_large"></a>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 post-content">
          <div class="col-lg-12 col-xs-12">
            <div class="markdown" v-html="content"></div>
          </div>
          <div class="col-lg-12 col-xs-12 post-content-bottom">
            <a @click="addFollow()" class="operation-btn" v-if="!post.is_follow">加入收藏</a>
            <a @click="addFollow()" class="operation-btn" v-else>取消收藏</a>
            <a>忽略主题</a>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 post-comment">
          <div class="col-lg-12 col-xs-12 post-comment-header">
          <span>
            {{post.comment_count}}&nbsp;&nbsp;回复&nbsp;&nbsp;<strong>|</strong>&nbsp;&nbsp;直到&nbsp;&nbsp;{{post.active_time}}
          </span>
            <span class="post-comment-node">
            <router-link :to="getNodeRoutes(node.id)"><b>{{node.title}}</b></router-link>
          </span>
          </div>
          <div class="col-lg-12 col-xs-12" id="pagination-top">
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page.sync="comment.page.page"
                           :page-size="comment.page.count"
                           :small="checkMedia()"
                           layout="prev, pager, next"
                           :total="comment.page.total">
            </el-pagination>
          </div>
          <div id="comment-start" class="col-lg-12 col-xs-12 list-group-item post-comment-body" v-for="comment in comment.body">
            <div class="col-lg-1 col-xs-1 post-comment-body-img" v-if="comment.member">
              <a><img class="img-rounded" :src="comment.member.avatar_large" :id="comment.member.id"></a>
            </div>
            <div class="col-lg-1 col-xs-1 col-xs-1 post-comment-body-img" v-else>
              <a><img class="img-rounded" src="/static/image/user_anon.jpeg"></a>
            </div>
            <div class="col-lg-11 col-xs-11 post-comment-body-info">
              <span class="comment-foor-number badge">{{comment.floor_number}}</span>
              <strong class="comment-username">{{comment.author}}</strong>&nbsp;&nbsp;
              <span class="comment-time">{{comment.create_time}}</span>&nbsp;&nbsp;
              <span class="comment-device" v-if="isWeb(comment.device)">via &nbsp;&nbsp;{{comment.device}}</span>
              <div class="comment-content">
                <span class="markdown" v-html="comment.content"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12 post-comment-bottom">
          <a href="#"><strong>↑</strong>&nbsp;回到顶部</a>
        </div>
        <div class="col-lg-12 col-xs-12" id="pagination-bottom">
          <el-pagination background
                         @current-change="handleCurrentChange"
                         :current-page.sync="comment.page.page"
                         :page-size="comment.page.count"
                         :small="checkMedia()"
                         layout="total, prev, pager, next"
                         :total="comment.page.total">
          </el-pagination>
        </div>
      </div>
      <div class="col-lg-2" id="post-right"></div>
    </div>
    <div class="col-lg-3"></div>
  </div>
</template>

<script>
  let marked = require('marked');
  import global_ from "../config/Global"

  const post_url = global_.URLS.POST_URL;
  const comment_url = global_.URLS.COMMENT_URL;
  const follow_url = global_.URLS.FOLLOW_POST_URL;
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
        this.$http.get(url, {
          headers: {
            "bid": global_.FUNC.getBid(),
            "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
          }
        }).then((data) => {
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
        let url = comment_url + post_id;
        this.$http.get(url, {
          params:{
            p:this.comment.page.page,
            count:this.comment.page.count
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

          let comments = data.body.data.body;
          let res = comments.map((item, index) => {
            item["content"] = marked(item["content"]);
            return item;
          });
          this.comment.body = res;
          this.comment.page.page = data.body.data.page;
          this.comment.page.count = data.body.data.count;
          this.comment.page.total = data.body.data.total;
        });
      },getNodeRoutes(id) {
        return "/forum/node/" + id;
      },getOriginRoutes(id) {
        return "https://www.v2ex.com/t/" + id;
      },
      handleCurrentChange(val) {
        this.comment.page.page = val;
        this.getComments();
        this.goAnchor("#comment-start");
      },
      isWeb(device) {
        return device !== "Web";
      },
      isEmpty(obj) {
        alert(obj != null);
        return obj != null;
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
      goAnchor(query) {
        let anchor = this.$el.querySelector(query);
        document.documentElement.scrollTop = anchor.offsetTop
      },
      addFollow() {
        let token = sessionStorage.getItem("access_token");
        if (token) {
          let post_id = this.$route.params.id;
          this.$http.post(follow_url, {
            body: {
              post_id: post_id
            }
          }, {
            headers: {
              bid: global_.FUNC.getBid(),
              "X-HASYOU-TOKEN":token
            }
          }).then((data) => {
            if (data.body.code === 200) {
              this.post.is_follow = !this.post.is_follow;
            } else if (data.body.code === 5006) {
              this.$message({
                message: '请先登录!',
                type: 'warning'
              });
              this.$router.push({path: "/login"});
            }
          });
        } else {
          this.$message({
            message: '请先登录!',
            type: 'warning'
          });
          this.$router.push({path: "/login"});
        }
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
    width: 100%;
    padding-top: 5px;
  }

  .post-content {
    padding: 10px 0 0 0;
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
    margin-top: 30px;
    background: white;
    border-radius: 3px;
  }

  .post-comment-header span {
    color: grey;
  }

  .post-comment-header {
    padding: 10px 0 10px 0;
  }

  .post-comment-bottom {
    margin-bottom: 30px;
    height: 30px;
    background: #e2e2e2;
    border-radius: 0 0 5px 5px;
  }

  .post-comment-bottom a {
    margin: 0 50px 0 0;
    color: black;
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
    padding: 15px 0;
  }

  .post-comment-body-img {
    padding: 0;
  }

  .post-comment-body-img img {
    width: 100%;
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
  }

  .markdown {
    margin-bottom: 20px;
  }

  div.markdown img {
    width: 60%;
  }

  #pagination-top {
    padding: 10px 0 15px 0;
    border-top: solid 1px grey;
  }

  .post-author b {
    color: grey;
    font-size: 15px;
  }

  .operation-btn:hover {
    color: #000000;
    cursor: pointer;
  }

  @media screen and (max-width: 415px) {
    #post-left,#post-right {
      display: none;
    }

    div>h1 {
      font-size: 28px;
    }

    span.post-title {
      font-size: 20px;
    }

    div.nav {
      font-size: 13px;
    }

    .post-header {
      padding: 0;
    }

    div.img-div img {
      width: 65px;
    }

    span.post-author b {
      font-size: 12px;
    }

    div#post-body {
      padding: 0;
    }

    span.post-title {
      font-size: 12px;
    }
  }
</style>
