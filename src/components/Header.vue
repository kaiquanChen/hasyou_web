<template>
  <header class="header">
    <div class="row">
      <nav class="navbar navbar-light bg-light justify-content-between">
        <div class="col-lg-6 col-xs-8">
          <router-link tag="div" class="navbar-brand" to="/">
            <img src="../../static/image/header.png" width="30" height="30" class="d-inline-block align-top img-rounded" alt="有你LOGO">
          </router-link>
          <router-link class="navbar-brand" to="/movie">电影</router-link>
          <router-link class="navbar-brand" to="/book">书库</router-link>
          <router-link class="navbar-brand" to="/read">阅读</router-link>
          <router-link class="navbar-brand" to="/music">音乐</router-link>
          <router-link class="navbar-brand" to="/event">同城</router-link>
          <router-link class="navbar-brand" to="/forum">论坛</router-link>
        </div>
        <div class="col-lg-2 blank"></div>
        <div class="col-lg-4 col-xs-4">
          <el-input
            placeholder="请输入内容"
            v-model="input5"
            class="input-with-select search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
  import global_ from "./config/Global"
  let base_group_url = global_.URLS.GROUP + "subjects";

  export default {
    name: "",
    data() {
      return {
        input3: '',
        input4: '',
        input5: '',
        select: ''
      }
    },
    created() {
      this.$http.get(base_group_url).then((data) => {
        if (data.status !== 200) {
          console.log(data);
          alert("数据获取失败!");
          return;
        }
        this.data = data.body.data;
      });
    }
  }
</script>

<style scoped>
  .row {
    margin: 0;
    padding: 0;
  }

  nav {
    background-color: grey;
  }

  nav a  {
    color: white;
  }

  nav a:hover {
    color: black;
  }

  .search {
    width: 60%;
    float: right;
    margin-top: 4px;
  }

  @media screen and (max-width: 415px) {
    div.blank {
      display: none;
    }

    div.col-xs-8 a {
      font-size: 12px;
      width: 30%;
      margin: 0 -20px 0 -20px;
    }

    div.col-xs-8 img {
      width: 20px;
      height: 20px;
    }

    .search {
      float: right;
      margin-right: -12px;
      width: 135px;
      font-size: 12px;
    }

    .search button {
      font-size: 10px;
    }

    div img {
      margin-left: -20px;
    }
  }

  /* 超小屏 */
  @media screen and (max-width: 361px) {
    div.blank {
      display: none;
    }

    div.col-xs-8 a {
      font-size: 8px;
      width: 30%;
      margin: 0 -18px 0 -18px;
    }

    div.col-xs-8 img {
      width: 20px;
      height: 20px;
    }

    .search {
      float: right;
      margin-right: -12px;
      width: 135px;
      font-size: 12px;
    }

    .search button {
      font-size: 10px;
    }

    div img {
      margin-left: -20px;
    }
  }

</style>
