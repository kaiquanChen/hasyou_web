<template>
    <div id="blogs">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 col-xs-12" id="blogs-body">
        <div class="col-lg-12 col-xs-12" id="blogs-left">
          <div :id="item.id" class="list-group-item blog-item" v-for="item in blogs">
            <div class="info">
              <!--<span class="info-item"><img :src=""></span>-->
              <span class="info-item">{{item.user.nickname}} · </span>
              <span class="info-item">{{item.create_time}}</span>
              <!--<span class="info-item">{{item.update}}</span>-->
            </div>
            <div class="title">
              <a :href="gotoDetail(item.id)">{{item.title}}</a>
            </div>
            <div class="extra">
              阅读&nbsp;{{item.click_count}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global"
    const list_blog_url = global_.URLS.LIST_BLOG_URL
    export default {
        name: "",
        data() {
            return {
              blogs:[],
              page: {
                p: 1,
                count: 20,
                total: 0
              },
            };
        },
        methods: {
          getBlogs() {
            this.$http.get(list_blog_url, {
              params:{
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

              this.blogs = data.body.data.body;
              this.page.p = data.body.page;
              this.page.count = data.body.count;
              this.page.total = data.body.total;
            })
          },
          gotoDetail(id) {
            return "/blog/" + id + "/subject";
          }
        },
        created() {
          this.getBlogs();
        }
    }
</script>

<style scoped>
  #blogs-body {
    margin-top: 35px;
  }

  .blog-item {

  }

  .blog-item span {
    color: #909090;
  }

  .title {
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    display:block;
  }

  .title a {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
  }

</style>
