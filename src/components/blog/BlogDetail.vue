<template>
    <div id="blog-subject">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 col-xs-12" id="blog-body">
        <div class="col-lg-12 col-xs-12" id="blog-subject-left">
          <div class="header">
            <img class="user-avatar" :src="blog.user.avatar" v-if="blog.user && blog.user.avatar" />
            <span class="info" v-if="blog.user && blog.user.nickname">{{blog.user.nickname}} · </span>
            <span class="info">{{blog.create_time}} · </span>
            <span class="info">阅读{{blog.click_count}}</span>
          </div>
          <div class="body">
            <div class="title">
              <span class="title-span">{{blog.title}}</span>
            </div>
            <div class="content">
              <div class="markdown" v-html="blog.content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
</template>

<script>
    let marked = require('marked');
    import global_ from "../config/Global"
    const blog_subject_url = global_.URLS.BLOG_SUBJECT_URL;
    export default {
        name: "",
        data() {
          return {
            blog:{}
          }
        },
        methods: {
          getBlog() {
            let id = this.$route.params.id;
            this.$http.get(blog_subject_url + "/" + id, {
              headers: {
                bid: global_.FUNC.getBid(),
                "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
              }
            }).then((data) => {
              let res = data.body;
              if (res.code !== 200) {
                console.log(res);
                this.$message.error("数据获取失败!");
                return;
              }
              this.blog = res.data;
              this.blog.content = marked(res.data.content, { sanitize: true });
            });
          }
        },
        created() {
          this.getBlog();
        }
    }
</script>

<style scoped>
  #blog-subject {
    margin-top: 50px;
  }

  .user-avatar {
    width: 35px;
    border-radius: 50%;
  }

  .info {
    margin-left: 7px;
    font-size: 16px;
    color: #909090;
  }

  .title {
    margin-top: 30px;
    border-bottom: 1px solid #c1c1c1;
  }

  .title-span {
    display: block;
    max-width: 100%;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
</style>
