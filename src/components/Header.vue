<template>
  <header class="site-header" id="top">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="row" style="margin: 0">
          <div class="col-lg-4 music">
            <!--<aplayer-->
            <!--id="input-search"-->
            <!--listFolded-->
            <!--mini: true,-->
            <!--:music="music_list[0]"-->
            <!--:list="music_list">-->
            <!--</aplayer>-->
          </div>
          <div class="col-lg-6">
            <div class="navbar-header">
              <button type="button" @click="showNav()" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <i class="fa fa-bars"></i>
              </button>
              <div class="logo-wrapper">
                <a class="navbar-brand" href="/">
                  <p>W<em>ithyou</em></p>
                </a>
              </div>
            </div>
            <div class="collapse navbar-collapse" id="main-menu">
              <ul class="nav navbar-nav navbar-right">
                <li><span></span><a href="/" class="home">首页</a></li>
                <li><span></span><a href="/book" class="home">读书</a></li>
                <li><span></span><a href="/movie" class="about">影视</a></li>
                <li><span></span><a href="/music" class="portfolio">音乐</a></li>
                <li><span></span><a href="/forum" class="map">论坛</a></li>
                <li><span></span><a href="/blog" class="contact">博客</a></li>
              </ul>
            </div>
          </div>
          <div id="mobile-home-nav" class="col-xs-12" v-show="mobile_nav_show">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="/book" class="home">读书</a></li>
              <li><a href="/movie" class="home">影视</a></li>
              <li><a href="/music" class="home">音乐</a></li>
              <li><a href="/forum" class="home">论坛</a></li>
              <li><a href="/blog" class="home">博客</a></li>
              <li><a :href="gotoPersonalCenter(user.id)" class="home" v-if="user">{{user.nickname}}</a></li>
              <li><a href="#" class="home" v-if="user" @click="logout">退出</a></li>
              <li><a href="/login" class="home" v-if="!user">登录</a></li>
              <li><a href="/register" class="home" v-if="!user">注册</a></li>
            </ul>
          </div>
          <div class="col-lg-2">
            <div class="collapse navbar-collapse" id="main-menu2">
              <ul class="nav navbar-nav navbar-right">
                <li><a :href="gotoPersonalCenter(user.id)" class="home" v-if="user">{{user.nickname}}</a></li>
                <li><a href="#" class="home" v-if="user" @click="logout">退出</a></li>
                <li><a href="/login" class="home" v-if="!user">登录</a></li>
                <li><a href="/register" class="home" v-if="!user">注册</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import Aplayer from 'vue-aplayer'
  import global_ from "./config/Global"
  import Bus from "../js/bus"

  let base_group_url = global_.URLS.GROUP + "subjects";
  let global_search_url = global_.URLS.GLOBAL_SEARCH_URL;
  let user_info_url = global_.URLS.USER_INFO_URL;
  let logout_url = global_.URLS.LOGOUT_URL;

  export default {
    components: {
      Aplayer
    },
    data() {
      return {
        mobile_nav_show: false,
        keywords: '',
        has_result: false,
        items:[],
        page: {
          total: 0,
          p: 1,
          count: 5
        },
        user:null,
        music_list:[
          {
            title: '永夜',
            artist: '石岩',
            src: 'http://image.hasyou.cn/fly/note/bb8812cf60014d819f29fea5db16ed06.mp3',
            pic: 'http://image.hasyou.cn/fly/note/fd88240b79ba4bf6ba9f06e88be2b86d.jpg'
          },
          {
            title: 'HollyBowling',
            artist: '',
            src: 'http://image.hasyou.cn/fly/note/fb055be4341e4c1fb84f4e40ffc7cf3c.mp3',
            pic: 'http://image.hasyou.cn/fly/note/25abfa03f7f94162b0be14e3901d5778.png'
          }
        ]
      }
    },
    methods: {
      showNav() {
        this.mobile_nav_show = !this.mobile_nav_show;
      },
      getLoginStatus() {
        Bus.$on("login-status", response => {
          this.getUserInfo();
        });
      },
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
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
      getUserInfo() {
        let token = global_.FUNC.getToken();
        if (token) {
          this.$http.get(user_info_url, {
            headers:{
              bid: global_.FUNC.getBid(),
              "X-HASYOU-TOKEN": token
            }
          }).then((data) => {
            let res = data.body;
            if (res.code === 200) {
              this.user = res.data;
              global_.FUNC.setUserInfo(this.user);
            }
          });
        }
      },
      gotoPersonalCenter(id) {
        return "/user/" + id;
      },
      logout() {
        this.$http.get(logout_url, {
          headers:{
            "bid": global_.FUNC.getBid(),
            "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
          }
        }).then((data) => {
          sessionStorage.removeItem("access_token");
          this.user = null;
          this.$router.push({path:"/"});
        });
      }
    },
    created() {
      this.initKeywords();
      this.getMessage();
      this.getUserInfo();
      this.getLoginStatus();
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

  /*nav {*/
    /*background-color: grey;*/
  /*}*/

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

  div.web-search {
    padding-top: 3px;
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

    .left img {
      width: 25px;
      height: 25px;
    }

    .search button {
      font-size: 10px;
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

    div.right a {
      font-size: 8px;
    }

  }
</style>
