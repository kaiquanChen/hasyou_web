<template>
  <div id="book_list" class="row">
    <div class="col-lg-12 col-xs-12 book-list-title"><h1>图书列表</h1></div>
    <div class="col-lg-12 col-xs-12">
      <div class="col-lg-12 col-xs-12 list-group-item" v-for="item in data">
        <div class="col-lg-1 col-xs-2 img_div">
          <router-link :to="getRoutes(item.id)" v-if="item.image_url"><img :src="item.image_url" /></router-link>
          <router-link :to="getRoutes(item.id)" v-else><img :src="item.image.medium" /></router-link>
        </div>
        <div class="col-lg-11 col-xs-10 book-list-info">
          <div><router-link :to="getRoutes(item.id)">{{item.name}}</router-link></div>
          <div>
            <span class="text-info">{{getBookInfo(item)}}</span>&nbsp;&nbsp;&nbsp;
            <el-rate
              class="book-list-rate"
              v-model="item.stars / 2"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="item.stars">
            </el-rate>
          </div>
          <div class="book-intro"><span class="text-info">{{getBookIntro(item.intro)}}</span></div>
        </div>
      </div>
    </div>
    <div class="col-lg-12 col-xs-12" id="pagination">
      <el-pagination background
                     @current-change="handleCurrentChange"
                     :current-page.sync="page"
                     :page-size="count"
                     :pager-count="pager_count"
                     :small="checkMedia()"
                     layout="total, prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  const book_url = global_.URLS.BOOK_URL;
  export default {
    name: "BookList",
    methods:{
      handleCurrentChange(val) {
        this.page = val;
        this.getBookList();
      },
      getRoutes(id) {
        return "/book/subject/" + id;
      },
      getStarsText(item) {
        return item.stars + "   (" + item.comments_count + item.reviews_count + " 人评价)";
      },
      getBookInfo(item) {
        let info = "";
        let authors = item.authors;
        let translators = item.translators;
        let publisher = item.publisher;
        let pubdate = item.publish_time;
        let price = item.price;
        if (authors.length !== 0) {
          info += authors + " / ";
        }
        if (translators.length !== 0) {
          info += translators + " / ";
        }
        if (publisher !== "") {
          info += publisher + " / ";
        }
        if (pubdate !== "" || pubdate !== null) {
          info += pubdate + " / ";
        }
        if (price !== "") {
          info += price;
        }

        return info;
      },
      getBookIntro(intros) {
        return intros.join("");
      },
      getBookList() {
        let tag_id = this.$route.params.tag_id;
        let book_list_url = book_url + "subjects/" + tag_id + "?p=" + this.page + "&count=" + this.count;
        this.$http.get(book_list_url).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          let res = data.body.data;
          this.data = res.body;
          this.total = res.total;
          this.page = res.page;
          this.count = res.count;
        });
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      }
    },
    data() {
      return {
        data: [],
        total: 0,
        page: 1,
        count: 20,
        pager_count: 7
      }
    },
    created() {
      if (this.checkMedia()) {
        this.pager_count = 5;
      }
      this.getBookList();
    }
  }

</script>

<style scoped>
  .img_div img {
    width: 85px;
  }

  .text-info {
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  #pagination {
    /*margin: 20px 0 30px 10px;*/
  }

  .text-info {
    color: grey;
  }

  div.list-group-item {
    border-left: white;
    border-right: white;
    border-top: dashed 1px grey;
    border-bottom: dashed 1px grey;
    padding: 20px 0 20px 0;
  }

  @media screen and (max-width: 415px) {
    .img_div img {
      width: 110%;
    }

    div.img_div {
      padding-left: 0;
      padding-right: 0;
    }

    .book-list-rate {
      margin-top: -15px;
      margin-bottom: 5px;
    }

    div.book-list-title h1 {
      font-size: 30px;
    }
  }
</style>
