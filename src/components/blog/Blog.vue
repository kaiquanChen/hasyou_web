<template>
    <div id="blog">
      <div class="col-lg-12 col-xs-12" id="blog-body">
        <div class="info">
          <header>
            <div class="blog-nav">
              <div class="blog-nav-info">
                <router-link to="/blog/latest" class="home">最新博客</router-link>
              </div>
              <div class="blog-nav-info">
                <router-link to="/blog/tag" class="home">博客分类</router-link>
              </div>
              <div class="blog-nav-info">
                <router-link :to="gotoMyBlog()" class="about">我的博客</router-link>
              </div>
              <div class="blog-nav-info">
                <router-link :to="gotoWriteBlog()" class="portfolio">写博客</router-link>
              </div>
            </div>
          </header>
        </div>
        <div class="body">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Blog",
        methods: {
          checkUserState() {
            let token = sessionStorage.getItem("access_token");
            if (!token) {
              this.$message({
                message: '请先登录!',
                type: 'warning'
              });
              this.$router.push({path: "/login"});
            } else  {
              let user_json = sessionStorage.getItem("user_info")
              return JSON.parse(user_json);
            }
          },
          gotoWriteBlog() {
            let user_info = this.checkUserState();
            return "/blog/" + user_info.nickname + "/write";
          },
          gotoMyBlog() {
            let user_info = this.checkUserState();
            return "/blog/" + user_info.nickname;
          }
        }
    }
</script>

<style scoped>
  @import "./css/blog.css";
</style>
