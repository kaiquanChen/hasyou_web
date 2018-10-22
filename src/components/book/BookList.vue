<template>
  <div id="book_list" class="container">
    <h1>图书列表</h1>
    <div class="col-sm-12">
      <div class="col-sm-12 list-group-item" v-for="item in data">
        <div class="col-sm-2 img_div">
          <router-link :to="getRoutes(item.id)"><img :src="item.image_url" /></router-link>
        </div>
        <div class="col-sm-10 book-list-info">
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
    <div class="col-sm-12" id="pagination">
      <el-pagination background
                     @current-change="handleCurrentChange"
                     :current-page.sync="page"
                     :page-size="count"
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
      }
    },
    data() {
      return {
        data: [],
        total: 0,
        page: 1,
        count: 20
      }
    },
    created() {
      this.getBookList();
    }
  }

</script>

<style scoped>
  .img_div {
    width: 110px;
    margin-left: -15px;
  }

  .img_div img {
    width: 90px;
  }

  /*.book-intro {*/
    /*margin: 5px 0 15px 0;*/
  /*}*/

  .book-intro span {
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  #pagination {
    margin: 20px 0 30px 10px;
  }

  .book-list-info div {
    margin: 7px 0 7px 0;
  }

  .book-list-rate {
    display: inline-block;
  }

  .text-info {
    color: grey;
  }

  .list-group-item {
    border-left: white;
    border-right: white;
    border-top: dashed 1px grey;
    border-bottom: dashed 1px grey;
  }
</style>
