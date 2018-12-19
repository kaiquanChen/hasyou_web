<template>
  <div class="row">
    <h1 id="title-header"><b>最新阅读推荐</b></h1>
    <div class="col-lg-6 col-xs-12 moment-item" @click="can_load && gotoDetail(moment.id)" v-for="moment in moments">
      <div class="title">
        <span>{{moment.title}}</span>
      </div>
      <div class="summary">
        <span>{{moment.summary}}</span>
      </div>
      <br>
      <div class="author">
        <span><img style="width: 24px;" :src="moment.user.avatar"></span>
        <span class="author-name">{{moment.user.name}}</span>
      </div>
      <div class="info">
        <span>{{moment.publish_time}}发布</span>
        <span>{{moment.liked_count}}赞</span>
        <span>{{moment.recs_count}}回复</span>
      </div>
    </div>
    <div class="col-lg-12 col-xs-12" id="more" @click="loadMore()">{{more_message}}</div>
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
          can_load: true
        }
      },
      methods: {
        getMomentList() {
          this.$http.get(moment_url, {
            headers: {
              bid: global_.FUNC.getBid()
            },
            params: {
              p: this.p,
              count: this.count
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
          });
        },
        gotoDetail(id) {
          window.open("https://www.douban.com/note/" + id, "_blank");
        },
        loadMore() {
          let max_page = Math.ceil(this.page.total / this.page.count);
          if (max_page === this.page.page) {
            this.$message.error("没有更多数据了!");
            this.more_message = "没有更多数据了!";
            this.can_load = false;
            return;
          }
          this.page.page = this.page.page + 1;
          this.getMomentList();
        },
        appendItems(items) {
          items.map( item => {
            this.moments.push(item);
          });
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
    padding: 30px 20px;
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
    margin: 10px 5px;
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
