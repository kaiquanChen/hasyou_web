<template>
  <div class="row">
    <div class="col-lg-3"></div>
    <div class="col-lg-6 col-xs-12">
      <header>
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"><span @click="goto('note')" append>个人笔记</span></el-menu-item>
          <el-menu-item index="2"><span @click="goto('album')" append>个人相册</span></el-menu-item>
        </el-menu>
      </header>
      <div class="col-lg-12 col-xs-12 " id="second-router">
        <router-view></router-view>
      </div>
    </div>
    <div class="col-lg-3"></div>
  </div>
</template>

<script>
    export default {
        name: "User",
        methods: {
            data() {},
            goto(path) {
                let id = this.$route.params.id;
                this.$router.push({
                  path: `/user/` + id + `/` + path
                });
            },
            handleSelect() {

            }
        }
    }
</script>

<style scoped>
  #second-router {
    margin-top: 50px;
  }
</style>
