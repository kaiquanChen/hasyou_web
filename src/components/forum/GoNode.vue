<template>
  <div class="row" id="v2">
    <div class="col-lg-3"></div>
    <div class="col-lg-6 col-xs-12">
      <div class="col-lg-1" id="v2-body-left"></div>
      <div class="col-lg-8 col-xs-12" id="v2-body">
        <div class="v2-title col-xs-12 col-lg-12"><h3>
          <router-link to="/forum"><b class="title-nav">论坛首页</b></router-link>&nbsp;&nbsp;>&nbsp;&nbsp;{{node.title}}</h3>
        </div>
        <div class="v2-content col-xs-12 col-lg-12">
          <div class="col-xs-12 v2-list">
            <div class="col-xs-12 list-group-item" id="v2-latest" v-for="post in posts.body" :id="post.id">
              <!-- image -->
              <router-link class="item-post-left col-xs-1 item-img" tag="div" :to="getPostRoutes(post.id)">
                <img class="img-rounded" :src="post.member.avatar_large"/>
              </router-link>
              <!-- post info-->
              <span class="badge">{{post.comment_count}}</span>
              <div class="col-xs-10 item-post">
            <span class="item-post-title">
              <router-link :to="getPostRoutes(post.id)">{{post.title}}</router-link>
            </span>
                <div class="item-post-node">
                  <router-link class="item-node" :to="getNodeRoutes(post.node.id)">
                    <span>{{post.node.title}}</span>
                  </router-link>&nbsp;/
                  <strong><a class="item-member">{{post.member.username}}</a></strong>
                  /&nbsp;&nbsp;&nbsp;{{post.create_time}}
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-lg-12" id="pagination">
              <el-pagination background
                             :small="checkMedia()"
                             @current-change="handleCurrentChange"
                             :current-page.sync="posts.page.page"
                             :page-size="posts.page.count"
                             :pager-count="getPagerCount()"
                             layout="total, prev, pager, next"
                             :total="posts.page.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3" id="v2-body-right">
        <!--节点-->
        <div class="col-xs-12" id="v2-node-header">
          <strong class="item-node">热门节点</strong>
        </div>
        <div class="col-xs-12" id="v2-node-body">
          <div  v-for="node in right_nodes">
            <div class="col-xs-12 item-node">
              <router-link :to="getNodeRoutes(node.id)"><b>{{node.title}}&nbsp;({{node.post_count}})</b></router-link>
            </div>
          </div>
        </div>
        <div class="col-xs-12" id="v2-node-more">
          <router-link to="/forum/go/node"><b class="item-node">更多节点</b></router-link>
        </div>
      </div>
    </div>
    <div class="col-lg-3"></div>
  </div>
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
      getPagerCount() {
        return this.checkMedia() === true ? 5 : 10;
      },
      handleCurrentChange(val) {
        this.posts.page.page = val;
        this.getPostList()
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
      getPostList(node_id) {
        if (!node_id) {
          node_id = this.$route.params.id;
        }
        let url = post_url + "subjects/" + node_id;
        this.$http.get(url, {
          params:{
            p:this.posts.page.page,
            count:this.posts.page.count
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
        this.$http.get(more_node_url, {
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
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

  b.title-nav {
    color: #4d5256;
  }

  @media screen and (max-width: 415px) {
    .img-rounded {
      width: 45px;
      margin-top: 10px;
    }

    #v2-body-right,#v2-body-left {
      display: none;
    }

    .v2-title h1 {
      font-size: 24px;
    }

    .v2-content {
      padding: 0;
    }

    #v2-tabs {
      margin: 3px 0 5px 0;
    }

    .item-post-title a {
      font-size: 12px;
      display: block;
      word-break: break-all;
      width: 270px;
      margin: 0;
    }

    .v2-list {
      padding: 0;
    }

    .item-node, .item-member {
      font-size: 10px;
    }

    div.item-post-node {
      font-size: 10px;
    }

    span.item-post-title {
      width: 300px;
    }

    div.item-img {
      margin-right: 10px;
      margin-left: -7px;
    }

  }

  @media screen and (min-width: 1100px) {
    div.item-img img {
      width: 60px;
    }
  }

  #v2-body-left {
    color: white;
  }

  #v2-body,.v2-list {
    padding: 0;
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
    padding-left: 0;
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
    padding: 5px 0 5px 10px;
  }
</style>
