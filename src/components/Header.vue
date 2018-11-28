<template>
  <header class="header">
    <div class="row">
      <nav class="navbar navbar-light bg-light justify-content-between">
        <div class="col-lg-6 col-xs-8 left">
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
        <div class="col-lg-4 col-xs-4 right">
          <router-link class="navbar-brand" to="/about">关于有你</router-link>
          <router-link class="navbar-brand" to="/note">留言板</router-link>
        </div>
        <div class="col-lg-12 col-xs-12 header-bar">
          <div class="col-lg-4">
            <!--<aplayer-->
              <!--id="input-search"-->
              <!--style="width: 60%;"-->
              <!--:music="{-->
                <!--title: 'HollyBowling',-->
                <!--artist: '',-->
                <!--src: 'http://image.hasyou.cn/fly/note/fb055be4341e4c1fb84f4e40ffc7cf3c.mp3',-->
                <!--pic: 'http://image.hasyou.cn/fly/note/25abfa03f7f94162b0be14e3901d5778.png'-->
              <!--}" ></aplayer>-->
          </div>
          <div class="col-lg-4 col-xs-12 search-div" >
            <el-input placeholder="书籍、电影、音乐"
                      v-model="keywords"
                      @keyup.enter.native="submitSearch()"
                      class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="submitSearch()" ></el-button>
            </el-input>
            <!--<div class="row result" v-show="has_result">-->
              <!--<router-link class="result-item" v-for="item in items" :key="result.id" to="getDetail(result)" tag="div">-->
                <!--<span v-if="item.name">{{item.name}}</span>-->
                <!--<span v-else-if="item.title">{{item.title}}</span>-->
              <!--</router-link>-->
              <!--<div class="search-result-footer">-->
                <!--<span class="pick-up" @click="pickUp()">收起</span>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div></div>
          <div class="col-lg-4"></div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
  import Aplayer from 'vue-aplayer'
  import global_ from "./config/Global"
  import Bus from "../js/bus"

  let base_group_url = global_.URLS.GROUP + "subjects";
  let global_search_url = global_.URLS.GLOBAL_SEARCH_URL;

  export default {
    components: {
      Aplayer
    },
    data() {
      return {
        keywords: '',
        has_result: false,
        items:[],
        page: {
          total: 0,
          p: 1,
          count: 5
        }
      }
    },
    methods: {
      showResult() {
        this.globalSearch();
        this.has_result = true;
      },
      submitSearch() {
        this.globalSearch();
        this.$router.push("/search");
      },
      pickUp() {
        this.has_result = false;
      },
      getGroupList() {
        this.$http.get(base_group_url, {
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }
          this.data = data.body.data;
        });
      },
      globalSearch() {
        this.$http.get(global_search_url, {
          params:{
            "keywords": this.keywords,
            "p": this.page.p,
            "count": this.page.count
          },
          headers:{
            "bid":global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.body.code !== 200) {
            this.$message.error("数据获取失败!");
            console.log(data);
            return;
          }

          let res = data.body.data;
          res["keywords"] = this.keywords;
          Bus.$emit('search-on', res);

          sessionStorage.setItem("search_record", this.keywords);
        })
      },
      initKeywords() {
        let data = sessionStorage.getItem("search_record");
        if (data) {
          this.keywords = data;
          this.globalSearch();
        }
      },
      getDetail(result) {
        if (result.type === "BOOK") {
          return "/book/subject" + result.id;
        } else if (result.type === "MOVIE") {
          return "/movie/subject" + result.id;
        }
      },
      getMessage() {
        Bus.$on("request-page", response => {
          this.page.p = response.p;
          this.page.count = response.count;
          this.page.total = response.total;
          this.keywords = response.keywords;

          this.globalSearch();
        });
      }
    },
    created() {
      this.initKeywords();
      this.getMessage();
    }
  }
</script>

<style scoped>
  .header-bar {
    background-color: #e9e9e2;
    padding-top: 10px;
    padding-bottom: 10px;
  }

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

  .result-item {
    cursor: pointer;
  }

  .result-item:hover {
    background-color: white;
  }

  div.right a {
    float: right;
  }

  div.search-div {
    position: relative;
    display: inline-block;
  }

  div.result {
    position: absolute;
    background-color: whitesmoke;
    z-index: 1000;
    padding: 3px 10px;
    width: 95%;
  }

  span.result-span {
    display:inline;
  }

  div.input-with-select {
    width: 100%;
  }

  div.search-result-footer {
    background: black;
  }

  span.pick-up {
    float: right;
    color: #3a8ee6;
  }

  span.pick-up:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 415px) {
    div.header-bar {
      background-color: #e9e9e2;
    }

    div.blank {
      display: none;
    }

    div.right a, div.left a {
      font-size: 12px;
    }

    div.left a {
      width: 30%;
      margin: 0 -20px 0 -20px;
    }

    div.right a {
      padding-left: 0;
      padding-right: 0;
      width: 50%;
    }

    div.col-xs-8 img {
      width: 20px;
      height: 20px;
    }

    .search button {
      font-size: 10px;
    }

    div img {
      margin-left: -20px;
    }

    div.result {
      width: 92%;
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

    .search button {
      font-size: 10px;
    }

    div img {
      margin-left: -20px;
    }

    div.right a {
      font-size: 8px;
    }

  }

</style>
