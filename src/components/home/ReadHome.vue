<template>
  <div id="read_home">
    <a style="color: #8B4513;" href="#">
      <img class="img-circle" style="height: 30px;" src="/static/icon/read.jpeg">&nbsp
      <strong style="font-size: 20px;">有你．阅读</strong>
    </a>
    <br/><br/>
    <span style="color: green;">今日推荐  · · · · · · </span><a href="#" style="color: chocolate">(更多)</a>
    <div class="list-group-item col-sm-12 col-xs-12" id="read_body">
      <ol class="list-group" v-for="item in data">
        <li :id="item.id" class="list-group-item">【阅读】<a href="#">{{item.name}}</a></li>
      </ol>
    </div>
  </div>
</template>

<script>
    import global_ from "../config/Global"
    const base_book_url = global_.URLS.SHORT_BOOK_URL;
    const shortbook_list_url = base_book_url + "/books";
    export default {
        name: "ReadHome",
        data() {
          return {
            data: []
          }
        },
        created() {
          this.$http.get(shortbook_list_url, {
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
  #read_home {
    margin: 15px 0 5px 30px;
  }

  #read_body {
    margin: 15px 5px 15px 0;
    border: white;
  }

  @media screen and (max-width: 415px) {

    #read_home {
      margin: 15px 0 5px 0;
    }

    div#read_body {
      padding: 0;
    }

  }
</style>
