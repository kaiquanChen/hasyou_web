<template>
  <div class="container" style="text-align: center">
    <div class="row">
      <div class="col-xs-12 col-lg-12 body">
        <div class="col-xs-12 col-lg-8" id="book-express">
          <div class="col-lg-12 col-xs-12 book-title">
            <b>新书快递</b>
            <span class="page-show">({{express_page.page}} / {{Math.ceil(express_page.total / express_page.count)}})</span>
            <el-pagination background
                           @current-change="handleExpress"
                           :current-page.sync="express_page.page"
                           :page-size="express_page.count"
                           :small="checkMedia()"
                           layout="prev, next"
                           :total="express_page.total">
            </el-pagination>
          </div>
          <div class="col-lg-2 col-xs-3 new-book" v-for="(item, index) in book_express">
            <div class="book-img" :id="item.id">
              <router-link :to="getBookDetail(item.id)" append v-if="item.image_url"><img :src="item.image_url"></router-link>
              <router-link :to="getBookDetail(item.id)" append v-else><img :src="item.image.medium"></router-link>
            </div>
            <div class="book-info">
              <span class="book-info-title"><router-link :to="getBookDetail(item.id)" append>{{item.name}}</router-link></span>
              <span class="book-info-author" >{{item.authors[0]}}</span>
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
          <div class="col-lg-12 col-xs-12 book-title">
            <b>畅销图书榜</b>
            <span class="page-show">({{good_market_page.page}} / {{Math.ceil(good_market_page.total / good_market_page.count)}})</span>
            <el-pagination background
                           @current-change="handleGoodMarket"
                           :current-page.sync="good_market_page.page"
                           :page-size="good_market_page.count"
                           :small="checkMedia()"
                           layout="prev, next"
                           :total="good_market_page.total">
            </el-pagination>
          </div><hr>
          <div class="col-lg-2 col-xs-3 good-market" v-for="item in book_good_market">
            <div class="book-img" :id="item.id">
              <router-link :to="getBookDetail(item.id)" append v-if="item.image_url"><img :src="item.image_url"></router-link>
              <router-link :to="getBookDetail(item.id)" append v-else><img :src="item.image.medium"></router-link>
            </div>
            <div class="book-info">
              <span class="book-info-title"><router-link :to="getBookDetail(item.id)" append>{{item.name}}</router-link></span>
              <span class="book-info-author" v-if="item.authors.length > 0">{{item.authors[0]}}</span>
              <span class="book-info-author" v-if="item.authors.length === 0">&nbsp;</span>
            </div>
            <br/>
          </div>
        </div>
        <div class="col-xs-12 col-lg-4" id="book-top250">
          <span><h2>图书 Top 250 &emsp;<router-link to="top250" append><b>更多>></b></router-link></h2></span><hr>
          <div class="col-lg-12 col-xs-12 top250 list-group-item" v-for="(item, index) in book_top250">
            <span class="book-info-title">{{index + 1}}.<router-link :to="getBookDetail(item.id)" append>{{item.name}}</router-link></span><br/>
            <span class="book-info-author" v-for="author in item.authors">{{author}}&emsp;</span>
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
          express_page:{
            total:0,
            p:1,
            count:0
          },
          good_market_page:{
            total:0,
            p:1,
            count:10
          },
          hot_tags:[],
          book_data:{}
        };
      },
      methods: {
        getBookList(type, count) {
          this.$http.get(BOOK_URL + type, {
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then((data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.book_data[type] = data.body.data;
            for (let i = 0; i < count; i++) {
              if (type === "BOOK_EXPRESS") {
                this.express_page.total = data.body.data.length;
                this.express_page.count = count;
                this.book_express[i] = data.body.data[i];
              } else if (type === "BOOK_GOOD_MARKET") {
                this.good_market_page.total = data.body.data.length;
                this.good_market_page.count = count;
                this.book_good_market[i] = data.body.data[i];
              }
            }
          });
        },
        handleExpress(val) {
          this.book_express = [];
          this.express_page.p = val;
          let start = (val - 1) * this.express_page.count;
          for (let j = 0; j < this.express_page.count && start < this.book_data["BOOK_EXPRESS"].length; start++) {
            this.book_express[j++] = this.book_data["BOOK_EXPRESS"][start];
          }
        },
        handleGoodMarket(val) {
          this.book_good_market = [];
          this.good_market_page.p = val;
          let start = (val - 1) * this.good_market_page.count;
          for (let j = 0; j < this.good_market_page.count && start < this.book_data["BOOK_GOOD_MARKET"].length; start++) {
            this.book_good_market[j++] = this.book_data["BOOK_GOOD_MARKET"][start];
          }
        },
        getBookDetail(id) {
          return "subject/" + id;
        },
        gotoTag(id) {
          return "/book/tag/" + id;
        },
        checkMedia() {
          return window.matchMedia('(max-width:415px)').matches;
        },
        getHotTags() {
          this.$http.get(tag_url + "subjects/DOUBAN_BOOK", {
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.hot_tags = data.body.data;
          });
        },
        getBookTop250() {
          this.$http.get(BOOK_URL + "subjects/top250", {
            params: {
              p: 1,
              count: 10
            },
            headers: {
              "bid":global_.FUNC.getBid()
            }
          }).then((data) => {
            this.book_top250 = data.body.data.body;
          });
        }
      },
      created() {
        let count = 10;
        if (this.checkMedia()) {
          count = 6;
        }
        this.getBookList("BOOK_EXPRESS", count);
        this.getBookList("BOOK_GOOD_MARKET", count);
        this.getHotTags();
        this.getBookTop250();
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
    height: 170px;
  }

  div.new-book {
    height: 225px;
  }

  div.book-info {
    margin-top: 5px;
  }

  span.page-show {
    color: #666;
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

  div#book-top250 b {
    font-size: 16px;
  }

  div.list-group-item:hover {
    background-color: #FFF5EA;
  }

  div.list-group-item {
    font-size: 16px;
    margin-bottom: 1px;
    border-bottom: lightgray 1px dashed;
    border-top: white;
    border-left: white;
    border-right: white;
  }

  div#hot-tag b {
    font-size: 18px;
  }

  .hot-tag-info {
    margin: 2px 8px 0 0;
  }

  div.book-title {
    margin: 5px 0 15px 0;
    padding-bottom: 4px;
    border-bottom: grey 1px solid;
  }

  div.book-title b {
    font-size: 24px;
  }

  div.el-pagination {
    float: right;
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
      height: 183px;
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
