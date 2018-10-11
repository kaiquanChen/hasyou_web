<template>
  <div class="col-sm-12" id="book_tag">
    <div class="col-sm-12" style="border-bottom:black solid 1px;margin-bottom: 30px;"><h2>有你图书标签</h2></div>
    <div id="tag_bother" class="col-sm-12" style='border-bottom-left: 2px;background: white;' v-for="parent in data">
      <div class="col-sm-12"><span class="tag">{{parent.tag_name}} · · · · · ·</span></div><br/><br/>
      <div class="col-sm-3" v-for="child in parent.children">
          <router-link :to="child.id" append>{{child.tag_name}}</router-link>&nbsp;
          <b>({{child.subject_count}})</b>
      </div>
      <div class="col-sm-12"><hr noshade="noshade"/></div>
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
      this.$http.get(book_tag_url).then((data) => {
        if (data.status !== 200) {
          console.log(data);
          alert("数据获取失败!");
          return;
        }
        this.data = data.body.data;
        console.log(data.body.data);
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
</style>
