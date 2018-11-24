<template>
  <div class="row" id="book_tag">
    <div class="col-lg-12 col-xs-12 title"><h2>有你图书标签</h2></div>
    <div id="tag_bother" class="col-lg-12 col-xs-12" style='border-bottom-left: 2px;background: white;' v-for="parent in data">
      <div class="col-lg-12 col-xs-12 tag-item-p"><span class="tag">{{parent.tag_name}} · · · · · ·</span></div><br/><br/>
      <div class="col-lg-3 col-xs-3 tag-item" v-for="child in parent.children">
          <router-link :to="child.id" append>{{child.tag_name}}</router-link>
          <b>({{child.subject_count}})</b>
      </div>
      <div class="col-lg-12"><hr noshade="noshade"/></div>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  const book_tag_url = global_.URLS.DOUBAN_BOOK_TAG_URL + "subjects/DOUBAN_BOOK";
  export default {
    name: "BookTag",
    data(){
      return {
        data: []
      }
    },
    methods:{

    },
    created() {
      this.$http.get(book_tag_url, {
        headers: {
          "bid": global_.FUNC.getBid()
        }
      }).then((data) => {
        if (data.status !== 200) {
          console.log(data);
          alert("数据获取失败!");
          return;
        }
        this.data = data.body.data;
      });
    }
  }
</script>

<style scoped>
  b {
    color: grey;
  }

  .tag {
    font-size: 20px;
  }

  div h2 {
    margin-bottom: 25px;
  }

  div.title {
    border-bottom:gainsboro solid 1px;
    /*margin-bottom: 30px;*/
  }

  div.title h2 {
    font-size: 26px;
  }

  div.tag-item-p {
    margin: 25px 0 10px 0;
    padding-left: 3px;
  }

  @media screen and (max-width: 415px) {
    div.tag-item {
      font-size: 11px;
      padding-right: 0;
      padding-left: 10px;
    }

    div.tag-item b {
      font-size: 10px;
    }
  }
</style>
