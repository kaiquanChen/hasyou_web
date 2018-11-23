<template>
  <div class="row">
    <div class="col-lg-8 col-xs-12 note-list">
      <h3 class="header-title">留言墙</h3>
      <div class="col-xs-12 col-lg-12 list-group-item" v-for="item in notes">
        <router-link class="title" :to="getNoteRoute(item.id)" v-if="item.type === 'FLY'" style="color: red">{{item.title}}</router-link>
        <router-link class="title" :to="getNoteRoute(item.id)" v-else>{{item.title}}</router-link><br>
        <span class="info" v-if="!item.user_id">游客</span>&emsp;
        <span class="info">{{item.create_time}}</span>&emsp;<br/>
        <span class="content">
          {{item.content}}
        </span>
      </div>
      <div class="col-lg-12 col-xs-12" id="pagination">
        <el-pagination background
                       @current-change="handleCurrentChange"
                       :current-page.sync="page.page"
                       :page-size="page.count"
                       :small="checkMedia()"
                       layout="total, prev, pager, next"
                       :total="page.total">
        </el-pagination>
      </div>
    </div>
    <div class="col-lg-4 col-xs-12 note-submit">
      <h3 class="header-title">信纸在此</h3>
      <div class="col-lg-12 col-xs-12 note-form">
        <!--提交表单-->
        <form method="post" enctype="multipart/form-data">
          <input class="note-title" type="text" name="title" ref="title" placeholder="请输入标题"><br/>
          <textarea class="note-content" rows="6" name="content" ref="content" placeholder="请输入内容"></textarea><br/>
          <input type="file" name="file" ref="file" @change="uploadFile">
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </form>
      </div>
      <div class="col-lg-12 col-xs-12 statement">
        <p>
          欢迎提BUG!;
          欢迎大家(虽然目测并没有多少人......!)尽情吐槽(反正我也不听..!).
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  let note_create_url = global_.URLS.NOTE_URL + "create";
  let note_list_url = global_.URLS.NOTE_URL + "subjects";
  let file_upload_url = global_.URLS.FILE_URL + "save";
  export default {
    data() {
      return {
        file_ids:[],
        page:{
          p: 1,
          count: 10,
          total: 0
        },
        notes:[]
      };
    },
    methods: {
      submitForm() {
        this.$http.post(note_create_url,
          {
            "body":{
              "title": this.$refs.title.value,
              "content": this.$refs.content.value,
              "file_ids": this.file_ids
            }
          },
          {
            headers:{"bid":global_.FUNC.getBid()}
          }).then((data) => {
          if (data.body.code !== 200) {
            console.log(data);
            this.$message.error("获取存储失败!");
            return;
          }

          this.notes.unshift(data.body.data);
        });
      },
      handleCurrentChange(val) {
        this.page.page = val;
        this.getNoteList();
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
      uploadFile() {
        let formData = new FormData();
        formData.append("file", document.querySelector('input[type=file]').files[0]);
        formData.append("title", "note");
        let options = {
          url: file_upload_url,
          data: formData,
          method:"post",
          headers: {
            'Content-Type': 'multipart/form-data',
            "bid": global_.FUNC.getBid()
          }
        };
        axios(options).then((res) => {this.file_ids.push(res.data.data.id);});
      },
      getNoteList() {
        this.$http.get(note_list_url, {
          params: {
            p: this.page.page,
            count: this.page.count
          },
          headers: {"bid": global_.FUNC.getBid()}
        }).then((data) => {
          if (data.body.code !== 200) {
            console.log(data);
            this.$message.error("获取存储失败!");
            return;
          }

          this.notes = data.body.data.body;
          this.page.page = data.body.data.page;
          this.page.total = data.body.data.total;
          this.page.count = data.body.data.count;
        });
      },
      getNoteRoute(id) {
        return "/note/subject/" + id;
      }
    },
    created() {
      this.getNoteList();
    }
  };
</script>

<style scoped>

  div.row {
    background-color: #E1E0C7;
    border-radius: 15px;
  }

  .header-title {
    text-align: center;
    margin-bottom: 50px;
  }

  .title {
    font-size: 14px;
  }

  span.content {
    font-size: 16px;
    margin: 10px 0;

    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  input {
    margin: 10px 0;
    width: 100%;
    border-radius: 9px;
  }

  div.note-list {
    border-radius: 9px;
  }

  input.note-title:focus, textarea.note-content:focus {
    outline: none;
    border: 1px solid #409eff;
    border-radius: 9px;
  }

  input.submit {
    background: #409eff;
    color: white;
    height: 40px;
  }

  textarea {
    border-radius: 9px;
    width: 100%;
  }

  .statement {
    margin-top: 30px;
    color: gray;
  }

  span.info {
    color: gray;
    font-size: 12px;
  }

  div#pagination {
    margin: 20px 0;
  }

  div.note-form {
    padding-right: 0;
    padding-left: 0;
  }

  div.list-group-item {
    border-radius: 20px;
    background-color: #f0eee7;
  }

  @media screen and (max-width: 415px) {

    div.note-list {
      padding-left: 0;
      padding-right: 0;
    }

    .title {
      font-size: 11px;
    }

    div.note-submit {
      margin-top: 50px;
    }
  }
</style>
