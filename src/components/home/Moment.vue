<template>
  <div class="row">
    <div class="col-lg-4"></div>
    <div class="col-lg-4 col-xs-12" id="moment-body">
      <h1 id="title-header"><b>最新阅读推荐</b></h1>
      <div class="col-lg-6 col-xs-12 moment-item" @click="gotoDetail(moment.id)" v-for="moment in moments">
        <div class="title">
          <span>{{moment.title}}</span>
        </div>
        <div class="summary">
          <span>{{moment.summary}}</span>
        </div>
        <div class="img" v-if="moment.image.length > 0">
          <img style="width: 64px;height: 64px;" :src="image" v-for="image in moment.image" />
        </div>
        <div style="width: 64px;height: 64px;" v-else></div>
        <div class="author" v-if="moment.user">
          <span ><img style="width: 24px;" :src="moment.user.avatar"></span>
          <span class="author-name">{{moment.user.name}}</span>
        </div>
        <div class="author"  v-else>
          <span ><img style="width: 24px;" src="/static/image/user_anon.jpeg"></span>
          <span style="color: gray;" class="author-name">[已注销]</span>
        </div>
        <div class="info">
          <span>{{moment.publish_time}}</span>
          <span>{{moment.liked_count}}赞</span>
          <span>{{moment.recs_count}}回复</span>
        </div>
      </div>
      <div class="col-lg-12 col-xs-12" id="more" @click="load_flag && loadMore()">
        <el-button class="btn-load" :loading="loading">{{more_message}}</el-button>
      </div>
    </div>
    <div class="col-lg-4"></div>
  </div>
</template>

<script>
  import global_ from "../config/Global"

  const moment_url = global_.URLS.MOMENT_SUBJECTS_URL;
    export default {
      name: "moment",
      data() {
        return {
          moments:[],
          page:{
            page: 1,
            count: 10,
            total: 0
          },
          more_message: "点击加载更多",
          load_flag: true,
          loadding: false
        }
      },
      methods: {
        getMomentList() {
          this.loading = true;
          this.$http.get(moment_url, {
            headers: {
              bid: global_.FUNC.getBid()
            },
            params: {
              p: this.page.page,
              count: this.page.count
            }
          }).then(data => {
            if (data.body.code !== 200) {
              this.$message.error("数据获取失败!");
              console.log(data);
              return;
            }

            let items = data.body.data.body;
            this.appendItems(items);
            this.page.page = data.body.data.page;
            this.page.count = data.body.data.count;
            this.page.total = data.body.data.total;
            this.loading = false;
          });
        },
        gotoDetail(id) {
          window.open("https://www.douban.com/note/" + id, "_blank");
        },
        loadMore() {
          this.load_flag = false;
          this.message = "加载中...";
          let can_load = this.canLoad();
          if (!can_load) {
            return;
          }

          this.page.page = this.page.page + 1;
          this.getMomentList();
        },
        appendItems(items) {
          this.load_flag = true;
          this.message = "点击加载更多!";
          items.map( item => {
            this.moments.push(item);
          });
        },
        canLoad() {
          if (Math.ceil(this.page.total / this.page.count) === this.page.page) {
            this.$message.error("没有更多数据了!");
            this.more_message = "没有更多数据了!";
            return false;
          }
          return true;
        }
      },
      created() {
        this.getMomentList();
      }
    }
</script>

<style scoped>
  #title-header {
    color: #738381;
    font-size: 22px;
    text-align: center;
    border-bottom: #ccc 1px solid;
    padding-bottom: 30px;
  }

  .moment-item {
    padding: 30px 15px;
    height: 290px;
  }

  .title {
    font-size: 18px;
    font-weight: 800;
    height: 20px;
    line-height: 20px;
    color: #1b2522;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .summary {
    font-size: 14px;
    color: #1b2522;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    line-height: 21px;
  }

  .moment-item:hover {
    background-color: #deefed;
    cursor: pointer;
    border-radius: 10px;
  }

  .info, .author {
    display: block;
    font-size: 12px;
    float: left;
    margin: 8px 10px;
  }

  .info span {
    float: left;
    border: #80bbb9 1px solid;
    margin-right: 10px;
    padding: 3px 10px;
    text-align: center;
    border-radius: 5px;
    color: #21bba6;
  }

  .author-name {
    color: #21bba6;
  }

  #more {
    text-align: center;
    margin: 50px 0 0 0;
    background-color: #e8f8f7;
    color: #1cc4ad;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    font-size: 18px
  }

  .btn-load {
    background-color: #e8f8f7;
    border: #e8f8f7;
  }

  div.img {
    /*float: left;*/
    display: block;
    margin-top: 5px;
  }

  div.img img {
    margin-right: 10px;
  }

  #moment-body {
    padding: 0;
  }

  @media screen and (max-width: 415px) {
    .title {
      font-size: 16px;
      font-weight: 800;
    }

    .summary {
      font-size: 14px;
    }

    .moment-item {
      border: #21bba6 1px solid;
      border-radius: 10px;
    }

    .info span {
      margin-right: 18px;
    }

  }

</style>
