<template>
  <div class="col-sm-12" id="forum_home">
    <a style="color: #8B4513;" href="#" target="_blank">
      <img class="img-circle" style="height: 30px;" src="/static/icon/forum.jpeg">&nbsp
      <strong style="font-size: 20px;">有你．论坛</strong>
    </a>
    <br/><br/>
    <span style="color: green;">今日推荐  · · · · · · </span><a href="#" style="color: chocolate">(更多)</a>
    <div class="list-group-item col-sm-12" id="forum_body">
      <ol class="list-group"  v-for="item in data">
        <li :id='item.id' class="list-group-item">【{{item.node.title}}】
          <a target="_blank" href="#">{{item.title}}</a>
          <span class="badge">{{item.create_time}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
    import global_ from "../config/Global"
    var base_post_url = global_.URLS.POST_URL
    var post_url = base_post_url + "/subjects?type=LATEST&p=1&count=5";
    export default {
      name: "ForumHome",
      data(){
        return {
          data: []
        }
      },
      methods:{

      },
      created() {
        this.$http.get(post_url).then((data) => {
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
  #forum_home {
    margin: 15px 0 5px 30px;
  }

  #forum_body {
    margin: 5px 5px 5px 0;
    border: white;
  }
</style>
