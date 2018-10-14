<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <el-row class="go-node">
    <el-col :span="3">
      <div class="header">
        nothing!
      </div>
    </el-col>
    <el-col :span="15">
      <div class="nav-header"><h3><router-link to="/forum"><b>论坛首页</b></router-link>&nbsp;&nbsp;>&nbsp;&nbsp;{{node.title}}</h3></div>
      <div id="v2-latest" v-for="post in posts.body">
        <div class="list-group-item row" :id="post.id">
          <!-- image -->
          <div class="item-post-left col-sm-1 item-img">
            <a :href="getPostRoutes(post.id)"><img class="img-rounded" :src="post.member.avatar_large"/></a>
          </div>
          <!-- post info-->
          <div class="col-sm-11 item-post">
            <span class="item-post-title"><router-link :to="getPostRoutes(post.id)">{{post.title}}</router-link></span>
            <span class="badge">{{post.comment_count}}</span>
            <div class="item-post-node">
              <a class="item-node" href="#">
                <span>{{post.node.title}}</span>
              </a>&nbsp;&nbsp;•&nbsp;&nbsp;
              <strong><a class="item-member">{{post.member.username}}</a></strong>
              &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;{{post.create_time}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12" id="pagination">
        <el-pagination background
                       @current-change="handleCurrentChange"
                       :current-page.sync="posts.page.page"
                       :page-size="posts.page.count"
                       layout="total, prev, pager, next"
                       :total="posts.page.total">
        </el-pagination>
      </div>
    </el-col>
    <el-col :span="6" class="go-node-right">
      <!--节点-->
      <div class="col-sm-12" id="v2-node-header">
        <strong class="item-node">热门节点</strong>
      </div>
      <div class="col-sm-12" id="v2-node-body">
        <div  v-for="node in right_nodes">
          <div class="col-sm-12 item-node">
            <a href="javasrcript:void(0)" v-on:click="toggle(node.id)"><b>{{node.title}}&nbsp;({{node.post_count}})</b></a>
          </div>
        </div>
      </div>
      <div class="col-sm-12" id="v2-node-more">
        <a href="/forum/go/node"><b class="item-node">更多节点</b></a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import global_ from "../config/Global"
  const post_url = global_.URLS.POST_URL;
  const node_url = global_.URLS.NODE_URL;
  export default {
    data() {
      return {
        activeName: '',
        posts:{
          body:[],
          page:{
            total: 0,
            page: 1,
            count: 20
          }
        },
        node: {},
        right_nodes: []
      };
    },
    methods: {
      toggle(id) {
        this.getPostList(id);
      },
      handleCurrentChange(val) {
        this.posts.page.page = val;
        this.getPostList()
      },
      getPostList(node_id) {
        if (!node_id) {
          node_id = this.$route.params.id;
        }
        let url = post_url + "subjects/" + node_id + "?p=" + this.posts.page.page + "&count=" + this.posts.page.count;
        this.$http.get(url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.posts.body = data.body.data.body;
          this.posts.page.total = data.body.data.total;
          this.posts.page.page = data.body.data.page;
          this.posts.page.count = data.body.data.count;
          this.node = data.body.data.extra.node;
          this.activeName = this.node.title;
        });
      },
      getPostRoutes(id) {
        return "/forum/" + id;
      },
      getMoreNodeList() {
        let more_node_url = node_url + "list";
        this.$http.get(more_node_url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.right_nodes = data.body.data.body;
        });
      },
      getNodeRoutes(id) {
        return "/forum/node/" + id;
      }
    },
    created() {
      this.getPostList();
      this.getMoreNodeList();
    }
  };
</script>

<style scoped>
  @import "../../../static/css/forum.css";
  .go-node {
    background-color: #F8F8F8;
  }

  .header {
    color: white;
  }

  .nav-header b {
    color: gray;
  }

  /* post list */
  .item-post-left {
    padding: 0 5px 0 0;
  }

  #v2 {
    background-color: #F8F8F8;
  }

  #v2-latest img {
    width: 60px;
  }

  .item-post-title a {
    color: grey;
  }

  .item-post-node,.item-node,.item-member {
    color: grey;
  }

  .item-post-title {
    margin-bottom: 10px;
  }

  .item-post-title a {
    text-decoration: none;
  }

  .badge {
    float: right;
  }

  .item-img {
    padding-left: 6px;
  }

  #pagination {
    margin: 10px 0 30px 0;
  }

  .item-post-title {
    display:-moz-inline-box;
    display:inline-block;
    width:580px;
    letter-spacing: 0.07em;
    line-height: 20px;
  }

  #v2-node-more, #v2-node-header, #v2-node-body {
    background: white;
    margin-left: 30px;
    width: 80%;
  }

  #v2-node-header {
    margin-top: 200px;
    border-bottom: solid 1px grey;
  }

  #v2-node-body {
    padding-top: 5px;
  }

  #v2-node-body b, #v2-node-more b {
    color: grey;
  }

  #v2-node-more {
    border-top: solid 1px grey;
    padding: 5px 0px 5px 10px;
  }
</style>
