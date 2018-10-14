<template>
    <el-row class="node">
      <el-col :span="3" class="node-left">
        <div class="node-left-child">nothing!
        </div>
      </el-col>
      <el-col :span="18" class="node-body">
        <div class="col-sm-12 node-body-header">
          <h3>共<b>{{nodes.length}}</b>个节点</h3>
        </div>
        <div class="node-list">
          <router-link :to="getNodeRoutes(node.id)" :key="node.id" v-for="node in nodes"><b class="item-node">{{node.title}}</b></router-link>
        </div>
      </el-col>
      <el-col :span="3" class="node-right">
        <!--nothing-->
      </el-col>
    </el-row>
</template>

<script>
  import global_ from "../config/Global"
  const node_url = global_.URLS.NODE_URL;
  export default {
    data() {
      return {
        nodes: []
      };
    },
    methods: {
      getNodeRoutes(id) {
        return "/forum/node/" + id;
      },
      getAllNodes() {
        let node_home_url = node_url + "listAll";
        this.$http.get(node_home_url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.nodes = data.body.data;
        });
      }
    },
    created() {
      this.getAllNodes();
    }
  };
</script>

<style scoped>
  @import "../../../static/css/forum.css";
  .node {
    background-color: #F8F8F8;
  }

  .node-left-child {
    color: white;
  }

  .node-body-header {
    text-align: center;
    border-bottom: solid 1px grey;
  }

  .item-node {
    color: grey;
  }

  .node-body {
    background: white;
    margin: 25px 0 30px 0;
  }

</style>
