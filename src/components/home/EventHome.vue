<template>
  <div id="event_home">
    <a style="color: #8B4513;" href="#" target="_blank">
      <img class="img-circle" style="height: 30px;" src="/static/icon/city.jpeg">&nbsp
      <strong style="font-size: 20px;">有你．同城</strong>
    </a>
    <br/><br/>
    <span style="color: green;">今日推荐  · · · · · · </span><a href="#" style="color: chocolate">(更多)</a>
    <div class="list-group-item col-sm-12" id="event_body">
      <ol class="list-group"  v-for="item in data">
        <li :id='item.id' class="list-group-item">【{{item.loc_name}}】
          <a href="#">{{item.title}}</a>
          <span class="badge">{{item.category_name}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  let base_event_url = global_.URLS.EVENT_URL;
  let event_url = base_event_url + "subjects?loc_id=108296&p=1&count=5";
  export default {
    name: "MovieHome",
    data() {
      return {
        data: []
      }
    },
    methods:{

    },
    created() {
      this.$http.get(event_url).then((data) => {
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
  #event_home {
    margin: 5px 0 5px 30px;
  }

  #event_body {
    margin: 5px 5px 5px 0;
    border: white;
  }

  @media screen and (max-width: 415px) {

    #event_home {
      margin: 15px 0 5px 0;
    }

    div#event_body {
      padding: 0;
    }

  }
</style>
