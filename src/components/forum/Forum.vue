<template>
  <div id="v2">
    <div class="row">
      <div class="col-lg-1" id="v2-body-left"></div>
      <div class="col-lg-8 col-xs-12" id="v2-body">
        <div class="v2-title col-xs-12 col-lg-12"><h1>有你论坛</h1></div>
        <div class="v2-content col-xs-12 col-lg-12">
          <el-tabs id="v2-tabs"
                   class="col-xs-12 col-lg-12"
                   v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane
              :label="node.title"
              :name="node.name"
              v-for="node in home_nodes"
              :key="node.id">
            </el-tab-pane>
          </el-tabs>
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
                <router-link target="_blank" :to="getPostRoutes(post.id)">{{post.title}}</router-link>
              </span>
                <div class="item-post-node">
                  <router-link class="item-node" :to="getNodeRoutes(post.node.id)">
                    <span>{{post.node.title}}</span>
                  </router-link>&nbsp;/
                  <strong><a class="item-member">{{post.member.username}}</a></strong>
                  /&nbsp;&nbsp;&nbsp;{{getTime(post.created)}}
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
    <div class="row">

    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  const post_url = global_.URLS.POST_URL;
  const node_url = global_.URLS.NODE_URL;
  export default {
    data() {
      return {
        activeName: 'LATEST',
        label: "LATEST",
        posts:{
          body:[],
          page:{
            total: 0,
            page: 1,
            count: 20
          }
        },
        home_nodes: [],
        right_nodes: [],
      };
    },
    methods: {
      handleClick(tab, event) {
        if (this.activeName === this.label) {
          return;
        }
        this.label = this.activeName;
        this.getPostList(this.label);
      },
      handleCurrentChange(val) {
        this.posts.page.page = val;
        this.getPostList(this.activeName)
      },
      getPostList(type) {
        let url = post_url + "subjects?type=" + type + "&p=" + this.posts.page.page + "&count=" + this.posts.page.count;
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
        });
      },
      getNodeRoutes(id) {
        return "/forum/node/" + id;
      },
      getNodeList() {
        let node_home_url = node_url + "home";
        this.$http.get(node_home_url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.home_nodes = data.body.data;
          console.log(this.home_nodes);
          if (this.home_nodes.length !== 0) {
            this.activeName = this.home_nodes[0].name;
          }
        });
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
      getPostRoutes(id) {
        return "/forum/" + id;
      },
      checkMedia() {
        let match = window.matchMedia('(max-width:415px)');
        return match.matches;
      },
      getPagerCount() {
        let res = this.checkMedia();
        return res === true ? 5 : 10;
      },
      getTime(time) {
        let res = "";

        let timespan = time * 1000;
        let dateTime = new Date(timespan);

        let year = dateTime.getFullYear();
        let month = dateTime.getMonth() + 1;
        let day = dateTime.getDate();
        let hour = dateTime.getHours();
        let minute = dateTime.getMinutes();
        let second = dateTime.getSeconds();

        let now = new Date();

        let now_year = now.getFullYear();
        let now_month = now.getMonth() + 1;
        let now_day = now.getDate();
        let now_hour = now.getHours();
        let now_minute = now.getMinutes();
        let now_second = now.getSeconds();

        if (year === now_year) {
          if (now_month - month) {
            res += now_month - month + " 月 ";
          } else {
            if ((now_day - day) > 0) {
              res += now_day - day + " 天 ";
            }

            if ((now_hour - hour) > 0) {
              res += now_hour - hour + " 小时 ";
            }

            if ((now_minute - minute) > 0) {
              res += now_minute - minute + " 分钟 ";
            }
          }
        } else {
          return year + "-" + month + "-" + day;
        }

        return res.trim() + "前";
      }
    },
    created() {
      this.getNodeList();
      this.getPostList(this.activeName);
      this.getMoreNodeList();
    }
  };
</script>

<style scoped>
  @import "../../../static/css/forum.css";

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
    padding: 5px 0px 5px 10px;
  }

</style>
