<template>
  <header class="header">
    <div class="row">
      <nav class="navbar navbar-light bg-light justify-content-between">
        <div class="col-6 col-xs-6 col-sm-6">
          <router-link class="navbar-brand" to="/">
            <img src="../../static/image/header.png" width="30" height="30" class="d-inline-block align-top img-rounded" alt="有你LOGO">
          </router-link>
          <router-link class="navbar-brand" to="/movie">电影</router-link>
          <router-link class="navbar-brand" to="/book">书库</router-link>
          <router-link class="navbar-brand" to="/read">阅读</router-link>
          <router-link class="navbar-brand" to="/music">音乐</router-link>
          <router-link class="navbar-brand" to="/event">同城</router-link>
          <router-link class="navbar-brand" to="/forum">论坛</router-link>
        </div>
        <div class="col-2 col-xs-2 col-sm-2" style="">

        </div>
        <div class="col-4 col-xs-4 col-sm-4">
          <form class="form-inline ml-auto">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
  // import global_ from "./config/Global"
  // var base_group_url = global_.URLS.GROUP + "subjects";
  //
  // export default {
  //   name: "",
  //   data() {
  //     return {
  //       data: []
  //     }
  //   },
  //   created() {
  //     this.$http.get(base_group_url).then((data) => {
  //       if (data.status !== 200) {
  //         console.log(data);
  //         alert("数据获取失败!");
  //         return;
  //       }
  //       this.data = data.body.data;
  //       console.log(data.body.data)
  //     });
  //   }
  // }
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

  form {
    /*margin: 7px 0 5px 25px;*/
    padding: 7px 0 5px 25px;
  }

</style>
