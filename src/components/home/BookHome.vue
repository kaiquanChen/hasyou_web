<template>
  <div id="book_home">
    <a style="color: #8B4513;" href="#" target="_blank">
      <img class="img-circle" style="height: 30px;" src="/static/icon/book.jpeg">&nbsp
      <strong style="font-size: 20px;">有你．书库</strong>
    </a>
    <br/><br/>
    <span style="color: green;">今日推荐  · · · · · · </span><a href="#" style="color: chocolate">(更多)</a>
    <div class="list-group-item col-sm-12 col-xs-12" id="book_body">
      <ol class="list-group"  v-for="item in data">
        <li :id='item.id' class="list-group-item">【TOP250】
          <router-link :to="getRoutes(item.id)">{{item.name}}</router-link>
          <span class="badge">{{item.stars}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
    import global_ from "../config/Global"
    const base_book_url = global_.URLS.BOOK_URL;
    const book_list_url = base_book_url + "/subjects/top250?p=1&count=5";
    export default {
        name: "BookHome",
        data(){
          return {
            data: []
          }
        },
        methods:{
          getRoutes(id) {
            return "/book/subject/" + id;
          }
        },
      created() {
        this.$http.get(book_list_url, {
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }
          this.data = data.body.data.body;
        });
      }
    }
</script>

<style scoped>
  #book_home {
    margin: 5px 0 5px 30px;
  }

  #book_body {
    margin: 5px 5px 5px 0;
    border: white;
  }

  @media screen and (max-width: 415px) {

    #book_home {
      margin: 15px 0 5px 0;
    }

    div#book_body {
      padding: 0;
    }

  }
</style>
