<template>
    <div class="row">
      <div class="col-lg-12 col-xs-12"><h1>图书 Top 250</h1></div>
      <div class="col-lg-9 col-xs-12 list-body">
        <div class="col-lg-12 col-xs-12 list-group-item" v-for="item in books">
          <div class="col-lg-2 col-xs-3 top250-img">
            <router-link :to="getBookRoute(item.id)"><img :src="item.image.medium"></router-link>
          </div>
          <div class="col-lg-10 col-xs-9 top250-book-info">
            <router-link :to="getBookRoute(item.id)">{{item.name}}</router-link><br>
            <span>{{item.origin_work_name}}</span><br><br>
            <span>{{item.authors[0]}}</span>&nbsp;/&nbsp;
            <span v-if="item.translators[0]">{{item.translators[0]}}&nbsp;/&nbsp;</span>
            <span v-if="item.publisher">{{item.publisher}}&nbsp;/&nbsp;</span>
            <span v-if="item.publish_time">{{item.publish_time}}&nbsp;/&nbsp;</span>
            <span v-if="item.price">{{item.price}}</span><br/><br/>
            <el-rate v-model="item.stars/2" :score-template="item.stars" show-score="true" disabled>&nbsp;{{item.stars}}</el-rate><br/>
            <p class="quote">'{{item.vars.intro}}'</p>
          </div>
        </div>
        <div class="col-lg-12 col-xs-12" id="pagination-bottom">
          <el-pagination background
                         @current-change="handleCurrentChange"
                         :current-page.sync="page.page"
                         :page-size="page.count"
                         :small="checkMedia()"
                         layout="total, prev, pager, next"
                         :total="page.total">
          </el-pagination>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
</template>

<script>
  import global_ from "../config/Global"
  const BOOK_URL = global_.URLS.BOOK_URL;
    export default {
        name: "",
      data(){
          return {
            books:[],
            page:{
              page:1,
              count:25,
              total:250
            }
          }
      },
      methods:{
        getBookList(type, p, count) {
          this.$http.get(BOOK_URL + type + "?p=" + p + "&count=" + count).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.books = data.body.data.body;
            this.page.total = data.body.data.total;
            this.page.page = data.body.data.page;
            this.page.count = data.body.data.count;
          });
        },
        handleCurrentChange(val) {
          this.page.page = val;
          this.getBookList("TOP250", val, this.page.count);
        },
        checkMedia() {
          return window.matchMedia('(max-width:415px)').matches;
        },
        getBookRoute(id) {
          return "/book/subject/" + id;
        }
      },
      created() {
        this.getBookList("TOP250", this.page.page, this.page.count);
      }
    }
</script>

<style scoped>
  div.list-group-item {
    margin-bottom: 1px;
    border-top: white;
    border-left: white;
    border-right: white;
    border-bottom: #bbbbbb 1px dashed;
  }

  div.top250-img {
    width: 100px;
    padding-right: 0;
  }

  div.top250-img img {
    /*width: 90px;*/
    width: 100%;
    float: right;
  }

  @media screen and (max-width: 415px) {
    div.list-group-item {
      padding-left: 0;
      padding-right: 0;
    }
    div.list-body {
      padding: 0;
    }
  }
</style>
