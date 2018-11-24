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
        <div class="col-lg-12 col-xs-12 search-area">
          <div class="col-lg-4"></div>
          <div class="col-lg-4 col-xs-12 search-div">
            <aplayer
              :music="{
                title: 'HollyBowling',
                artist: '',
                src: 'http://image.hasyou.cn/fly/note/fb055be4341e4c1fb84f4e40ffc7cf3c.mp3',
                pic: 'http://image.hasyou.cn/fly/note/25abfa03f7f94162b0be14e3901d5778.png'
              }"
            ></aplayer>
            <!--<aplayer-->
              <!--listFolded-->
              <!--theme="pic"-->
              <!--shuffle-->
              <!--repeat="list"-->
              <!--show-lrc-->
              <!--:muted.sync="muted"-->
              <!--:volume.sync="volume"-->
              <!--:music='list3[0]'-->
              <!--:list='list3'-->
            <!--&gt;</aplayer>-->
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
  let base_group_url = global_.URLS.GROUP + "subjects";

  export default {
    components: {
      Aplayer
    },
    data() {
      return {
        data:[],
        select: '',
        list3:[
          {
            title: 'HollyBowling',
            artist: '',
            src: 'http://image.hasyou.cn/fly/note/fb055be4341e4c1fb84f4e40ffc7cf3c.mp3',
            pic: 'http://image.hasyou.cn/fly/note/25abfa03f7f94162b0be14e3901d5778.png'
          }
        ]
      }
    },
    created() {
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
    }
  }
</script>

<style scoped>
  .search-area {
    background-color: #e9e9e2;
    padding-top: 15px;
    padding-bottom: 15px;
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

  div.right a {
    float: right;
  }

  div.search-div {
    position: relative;
    display: inline-block;
  }

  @media screen and (max-width: 415px) {
    div.search-area {
      background-color: #e9e9e2;
      padding-top: 10px;
      padding-bottom: 10px;
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
