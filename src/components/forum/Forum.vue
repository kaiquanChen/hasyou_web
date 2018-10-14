<template>
  <el-row id="v2">
    <el-row>
      <el-col :span="3" id="v2-body-left">
        nothing!
      </el-col>
      <el-col :span="15" id="v2-body">
        <div><h1>有你论坛</h1></div>
        <el-tabs id="v2-tabs"
          v-model="activeName"
          @tab-click="handleClick">
          <el-tab-pane :label="node.title" :name="node.name" v-for="node in home_nodes" :key="node.id">
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
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="6" id="v2-body-right">
        <!--节点-->
        <div class="col-sm-12" id="v2-node-header">
          <strong class="item-node">热门节点</strong>
        </div>
        <div class="col-sm-12" id="v2-node-body">
          <div  v-for="node in right_nodes">
            <div class="col-sm-12 item-node">
              <router-link :to="getNodeRoutes(node.id)"><b>{{node.title}}&nbsp;({{node.post_count}})</b></router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-12" id="v2-node-more">
            <router-link to="/forum/go/node"><b class="item-node">更多节点</b></router-link>
        </div>
      </el-col>
    </el-row>
  </el-row>
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
          if (this.home_nodes.leng !== 0) {
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
  #v2-body-left {
    color: white;
  }
  #v2-body {
    margin: 0 auto;
  }

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
