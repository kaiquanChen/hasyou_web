<template>
  <div class="container" style="text-align: center">
    <div class="row">
      <div class="col-xs-12 col-lg-12 body">
        <div class="col-xs-12 col-lg-8" id="book-express">
          <span><h2>新书快递</h2></span><hr>
          <div class="col-lg-2 col-xs-3 new-book" v-for="item in book_express">
            <div class="book-img" :id="item.id">
              <router-link :to="getBookDetail(item.id)" append><img :src="item.image_url"></router-link>
            </div>
            <div class="book-info">
              <span class="book-info-title"><router-link :to="getBookDetail(item.id)" append>{{item.name}}</router-link></span>
              <span class="book-info-author" v-for="author in item.authors">{{author}}</span>
            </div>
            <br/>
          </div>
        </div>
        <div class="col-xs-12 col-lg-4" id="hot-tag">
          <span><h2>热门标签&emsp;&emsp;<router-link to="/book/tag"><b>更多>></b></router-link></h2></span><hr>
          <div class="col-lg-12 col-xs-12" v-for="item in hot_tags">
            <span>{{item.tag_name}}</span>
            <el-tag type="info" class="hot-tag-info" size="medium" :key="index" v-for="(tag, index) in item.children" v-if="index <= 7">
              <router-link tag="a" :to="gotoTag(item.id)" append>{{tag.tag_name}}</router-link>
            </el-tag>
            <br/>
          </div>
        </div>
        <div class="col-xs-12 col-lg-8" id="good-market">
          <span><h2>畅销图书榜</h2></span><hr>
          <div class="col-lg-2 col-xs-3 good-market" v-for="item in book_good_market">
            <div class="book-img" :id="item.id">
              <router-link :to="getBookDetail(item.id)" append><img :src="item.image_url"></router-link>
            </div>
            <div class="book-info">
              <span class="book-info-title"><router-link :to="getBookDetail(item.id)" append>{{item.name}}</router-link></span>
              <span class="book-info-author" v-for="author in item.authors">{{author}}</span>
            </div>
            <br/>
          </div>
        </div>
        <div class="col-xs-12 col-lg-4" id="book-top250">
          <span><h2>图书 Top 250 &emsp;<router-link to="#"><b>更多>></b></router-link></h2></span><hr>
          <div class="col-lg-12 col-xs-12 top250 list-group-item" v-for="(item, index) in book_top250">
            <span class="book-info-title">{{index + 1}}.<router-link :to="getBookDetail(item.id)" append>{{item.name}}</router-link></span><br/>
            <span class="book-info-author" v-for="author in item.authors">{{author}}&emsp;&emsp;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  const BOOK_URL = global_.URLS.BOOK_URL;
  const tag_url = global_.URLS.DOUBAN_BOOK_TAG_URL;
    export default {
      name: "book",
      data() {
        return {
          book_express:[],
          book_top250:[],
          book_good_market:[],
          hot_tags:[]
        };
      },
      methods: {
        getBookList(type, p, count) {
          this.$http.get(BOOK_URL + type + "?p=" + p + "&count=" + count).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            if (type === "BOOK_EXPRESS") {
              this.book_express = data.body.data.body;
            } else if (type === "TOP250") {
              this.book_top250 = data.body.data.body;
            } else if (type === "BOOK_GOOD_MARKET") {
              this.book_good_market = data.body.data.body;
            }
          });
        },
        getBookDetail(id) {
          return "subject/" + id;
        },
        gotoTag(id) {
          return "/book/tag/" + id;
        },
        getHotTags() {
          this.$http.get(tag_url + "subjects/DOUBAN_BOOK").then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.hot_tags = data.body.data;
          });
        },
      },
      created() {
        this.getBookList("BOOK_EXPRESS", 1, 1000);
        this.getBookList("TOP250", 1, 10);
        this.getBookList("BOOK_GOOD_MARKET", 1, 1000);
        this.getHotTags();
      }
    }
</script>

<style scoped>
  div.body {
    padding: 0;
  }

  div.new-book,div.good-market {
    margin-right: 22px;
  }

  div#book-express,div#hot-tag,div#good-market,div#book-top250 {
    margin-top: 25px;
  }

  #book-express,#good-market {
    text-align: left;
    padding-left: 0;
    padding-right: 50px;
  }

  div#hot-tag,div#book-top250 {
    text-align: left;
  }

  div#hot-tag h2,#book-top250 h2 {
    font-size: 20px;
  }

  div.book-img img {
    width: 115px;
    height: 172px;
  }

  div.new-book {
    height: 230px;
  }

  div.book-info {
    margin-top: 5px;
  }

  div.book-info span {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    width: 115px;
    display:block;
  }

  h2 {
    font-weight:bold;
  }

  div.top250 {
    font-size: 20px;
  }

  div#book-top250 b {
    font-size: 16px;
  }

  div.list-group-item:hover {
    background-color: #FFF5EA;
  }

  div.list-group-item {
    border: white;
    border-bottom: grey 1px dashed;
  }

  div#hot-tag b {
    font-size: 18px;
  }

  .hot-tag-info {
    margin: 2px 8px 0 0;
  }

  @media screen and (max-width: 415px) {
    div#book-express, div#good-market {
      padding-right: 0;
    }

    div#book-express>span>h2,div#good-market>span>h2,div#hot-tag>span>h2 {
      font-size: 20px;
    }

    div#hot-tag {
      padding: 0;
    }

    div.new-book, div.good-market {
      height: 200px;
    }

    div.book-img img {
      width: 105px;
      height: 142px;
    }

    div.book-info {
      font-size: 10px;
    }

    div.book-info span {
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space:nowrap;
      display:block;
    }

  }
</style>
