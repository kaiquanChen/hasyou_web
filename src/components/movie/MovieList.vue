<template>
  <el-row>
    <el-col :span="3">
      <div class="col-xs-12" id="left">
        nothing!
      </div>
    </el-col>
    <el-col :span="15">
      <h2><b>选影视</b></h2>
      <div class="col-xs-12 genres-header">
        <span class="genre-index">全部形式</span>&nbsp;&nbsp;&nbsp;
        <router-link tag="span" to="#" v-for="level in level1" :key="level.id">{{ level.name }}&nbsp;&nbsp;&nbsp;</router-link>
      </div>
      <div class="col-xs-12 genres-header">
        <span class="genre-index">全部类型</span>&nbsp;&nbsp;&nbsp;
        <router-link tag="span" to="#" v-for="level in level2" :key="level.id">&nbsp;&nbsp;&nbsp;{{ level.name }}&nbsp;&nbsp;&nbsp;</router-link>
      </div>
      <div class="col-xs-12 genres-header">
        <span class="genre-index">全部地区</span>&nbsp;&nbsp;&nbsp;
        <router-link tag="span" to="#" v-for="level in level3" :key="level.id">{{ level.name }}&nbsp;&nbsp;&nbsp;</router-link>
      </div>
      <div class="col-xs-12 genres-header">
        <span class="genre-index">全部年代</span>&nbsp;&nbsp;&nbsp;
        <router-link tag="span" to="#" v-for="level in level4" :key="level.id">{{ level.name }}&nbsp;&nbsp;&nbsp;</router-link>
      </div>
      <div class="col-xs-12 genres-header">
        <span class="genre-index">全部特色</span>&nbsp;&nbsp;&nbsp;
        <router-link tag="span" to="#" v-for="level in level5" :key="level.id">{{ level.name }}&nbsp;&nbsp;&nbsp;</router-link>
      </div>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
  import global_ from "../config/Global"
  const movie_genre_url = global_.URLS.DOUBAN_MOVIE + "tag/genres";
  export default {
    name: "MovieDetail",
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getMovieComment();
      },
      getMovieTags() {
        this.$http.get(movie_genre_url, {
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败");
          }

          let genres = data.body.data;
          this.level1 = genres["1"];
          this.level2 = genres["2"];
          this.level3 = genres["3"];
          this.level4 = genres["4"];
          this.level5 = genres["5"];
        })
      },
      isEmpty(array) {
        return JSON.stringify(array) !== '[]';

      }
    },
    data() {
      return {
        data: {},
        level1: [],
        level2: [],
        level3: [],
        level4: [],
        level5: [],
        image: {}
      }
    },
    created() {
      this.getMovieTags();
    }
  }
</script>

<style scoped>
  #left {
    color: white;
  }

  .genres-header {
    margin-top: 15px;
  }

  .genres-tag {
    color: white;
    font-size: 14px;
  }

  div span {
    margin-top: 3px;
  }

  div span:hover {
    cursor: pointer;
    color: #72ACE3;
  }

  .genre-index {

  }
</style>
