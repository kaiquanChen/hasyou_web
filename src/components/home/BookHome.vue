<template>
  <div class="col-sm-12" id="book_home">
    <a style="color: #8B4513;" href="#" target="_blank">
      <img class="img-circle" style="height: 30px;" src="/static/icon/book.jpeg">&nbsp
      <strong style="font-size: 20px;">有你．书库</strong>
    </a>
    <br/><br/>
    <span style="color: green;">今日推荐  · · · · · · </span><a href="#" style="color: chocolate">(更多)</a>
    <div class="list-group-item col-sm-12" id="book_body">
      <ol :id='item.id' class="list-group"  v-for="item in data">
        <li class="list-group-item">【书库】
          <a target="_blank" href="#">{{item.name}}</a>
          <span class="badge">{{item.stars}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
    import global_ from "../config/Global"
    const base_book_url = global_.URLS.BOOK_URL;
    const tag_id = "f9427f176f8547c3882f77c49605ccab";
    const book_list_url = base_book_url + "/subjects/" + tag_id + "?p=1&count=5";
    export default {
        name: "BookHome",
        data(){
          return {
            data: []
          }
        },
        methods:{

        },
      created() {
        this.$http.get(book_list_url).then((data) => {
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

  #book-body {
    margin: 5px 5px 5px 0;
    border: white;
  }
</style>
