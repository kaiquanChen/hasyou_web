<template>
  <div class="row">
    <div class="col-lg-2"></div>
    <div class="col-lg-8 col-xs-12 body">
      <div class="col-lg-12 col-xs-12 search-header">
        <h2>搜索<span class="keywords">{{keywords}}</span>共<span class="keywords">{{page.total}}</span>个结果</h2>
      </div>
      <div class="col-lg-12 col-xs-12 list-group-item" v-for="item in items">
        <div class="col-lg-11 col-xs-11 info">
          <span style="float: left" class="title" v-if="item.type === 'book'">[图书]&nbsp;<router-link target="_blank" tag="a" :to="getDetail(item)">{{item.name}}</router-link></span>
          <span style="float: left" class="title" v-if="item.type === 'movie'">[电影]&nbsp;<router-link target="_blank" tag="a" :to="getDetail(item)">{{item.name}}</router-link></span>
          <el-rate
            class="book-list-rate"
            v-model="item.stars / 2"
            disabled
            show-score
            text-color="#ff9900"
            :score-template="item.stars">
          </el-rate> <br>
          <span v-if="item.origin_title">原名: {{item.origin_title}} /</span>
          <span v-if="item.type === 'book' && item.vars.authors && index < 1" v-for="(author, index) in item.vars.authors">作者: {{author}} / </span>
          <span v-if="item.type === 'book' && item.vars.translators && index < 1" v-for="(translator, index) in item.vars.translators">译者: {{translator}} / </span>
          <span v-if="item.type === 'movie' && item.vars.year">年份: {{item.vars.year}} / </span>
          <span v-if="item.type === 'movie' && item.vars.countries && index < 1" v-for="(country, index) in item.vars.countries">国家: {{country}} / </span>
          <span class="intro text-info">{{item.intro}}</span>
        </div>
        <div class="col-lg-1 col-xs-1 img">
          <a target="_blank" :href="item.image_url"><img :src="item.image_url" :alt="item.name" /></a>
        </div>
      </div>
      <div class="col-lg-12 col-xs-12" id="pagination">
        <el-pagination background
                       @current-change="handleCurrentChange"
                       :current-page.sync="page.p"
                       :page-size="page.count"
                       :pager-count="pager_count"
                       :small="checkMedia()"
                       layout="total, prev, pager, next"
                       :total="page.total">
        </el-pagination>
      </div>
    </div>
    <div class="col-lg-2"></div>
  </div>
</template>

<script>
  import global_ from "./config/Global"
  import Bus from '../js/bus'
    export default {
      name: "",
      data() {
        return {
          keywords: "",
          items: [],
          page: {
            total: 0,
            p: 1,
            count: 10
          },
          pager_count: 7
        }
      },
      methods: {
        getMessage() {
          Bus.$on("search-on", response => {
            this.items = response.body;
            this.page.p = response.page;
            this.page.count = response.count;
            this.page.total = response.total;
            this.keywords = response.keywords;
          });
        },
        getDetail(item) {
          if (item.type === "book") {
            return "/book/subject/" + item.id;
          } else if (item.type === "movie") {
            return "/movie/subject/" + item.id;
          }
        },
        checkMedia() {
          return window.matchMedia('(max-width:415px)').matches;
        },
        handleCurrentChange(val) {
          Bus.$emit("request-page", {
            p: this.page.p,
            count: this.page.count,
            total: this.page.total,
            keywords: this.keywords
          });
        }
      },
      created() {
        if (this.checkMedia()) {
          this.pager_count = 5;
        }

        this.getMessage();
      }
    }
</script>

<style scoped>
  span.keywords {
    color: red;
  }

  div.img img {
    width: 45px;
  }

  span.intro {
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: #999;
    margin: 5px 0;
  }

  div.info {
    padding: 5px 0;
  }

  span.title {
    color: #666666;
  }

  .book-list-rate {
    margin-left: 15px;
    float: left;
  }

  div#pagination {
    margin: 10px 0 0 10px;
  }

  div.search-header {
    margin: 0 0 5px 3px;
  }

  div.img {
    padding-right: 0;
  }

  @media screen and (max-width: 415px) {
    div.body {
      padding-left: 0;
      padding-right: 0;
    }

    div.search-header h2 {
      font-size: 24px;
    }

    div.img {
      padding-left: 0;
      padding-right: 0;
    }

    div.list-group-item {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
</style>
