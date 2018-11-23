<template>
  <div class="row body">
    <div class="col-lg-2"></div>
    <div class="col-lg-8 col-xs-12">
      <div class="col-lg-12 col-xs-12 note-item">
        <span class="note-title">{{note.title}}</span><br>
        <span class="info" v-if="!note.user_id">游客</span>&emsp;
        <span class="info">{{note.create_time}}</span><hr>
        <span class="content">
          {{note.content}}
        </span><br><br>
        <a target="_blank" :href="file.file_url" v-for="file in note.files">
          <img class="note-img" :src="file.file_url">
          <!--<img class="note-img" src="/static/image/movie_anon.jpg">-->
        </a>
      </div>
      <div class="col-lg-12 col-xs-12 note-comment">
        <div class="col-lg-12 col-xs-12 list-group-item" v-for="(comment, index) in note_comments">
          <span class="info" v-if="!comment.user_id">游客</span>&emsp;
          <span class="info">{{comment.create_time}}</span>
          <span class="badge">{{(page.p - 1) * page.count + index + 1}}</span><br>
          <p class="content">{{comment.content}}</p>
        </div>
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

      <div class="col-lg-12 col-xs-12 note-form">
        <form method="post" enctype="multipart/form-data">
          <textarea class="note-content" rows="6" name="content" ref="content" placeholder="请输入内容"></textarea><br/>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button type="info" @click="clearForm()">清空</el-button>
        </form>
      </div>
    </div>
    <div class="col-lg-2"></div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  let note_detail_url = global_.URLS.NOTE_URL + "subject/";
  let create_comment_url = global_.URLS.NOTE_URL + "comment/create";
  let list_comment_url = global_.URLS.NOTE_URL + "comment/";
  export default {
      name: "",
    data() {
        return {
          note:{},
          note_comments:[],
          page:{
            p: 1,
            count: 5
          }
        }
    },
    methods: {
        getNoteDetail() {
          let note_id = this.$route.params.id;
          this.$http.get(note_detail_url + note_id, {
            headers: {"bid": global_.FUNC.getBid()}
          }).then((data) => {
            if (data.body.code !== 200) {
              console.log(data);
              this.$message.error("获取存储失败!");
              return;
            }

            this.note = data.body.data;
          });
        },
        getNoteCommentList() {
          let note_id = this.$route.params.id;
          this.$http.get(list_comment_url + note_id, {
            params:{
              p: this.page.p,
              count: this.page.count
            },
            headers:{"bid":global_.FUNC.getBid()}
          }).then((data) => {
            if (data.body.code !== 200) {
              console.log(data);
              this.$message.error("获取存储失败!");
              return;
            }

            this.note_comments = data.body.data.body;
            this.page.page = data.body.data.page;
            this.page.count = data.body.data.count;
            this.page.total = data.body.data.total;
          });
        },
      handleCurrentChange(val) {
        this.page.p = val;
        this.getNoteCommentList();
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
      clearForm() {
          this.$refs.content.value = "";
      },
      submitForm() {
        this.$http.post(create_comment_url,
          {
            "body":{
              "content": this.$refs.content.value,
              "note_id": this.$route.params.id
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
            this.$refs.content.value = "";
            this.$message({
              message: '提交成功!',
              type: 'success'
            });

            this.getNoteCommentList();
        });
      }
    },
    created() {
        if (this.checkMedia()) {
          this.page.count = 1;
        }
        this.getNoteDetail();
        this.getNoteCommentList();
    }
  }
</script>

<style scoped>

  div.body {
    background-color: #E1E0C7;
    border-radius: 30px;
  }

  span.note-title {
    font-size: 16px;
    color: #FF8040;
  }

  div.note-item {
    margin-top: 30px;
    padding-top: 15px;
  }

  span.info {
    color: gray;
  }

  img.note-img {
    width: 100px;
    padding: 10px 0 10px 10px;
  }

  div.note-comment, div.note-item {
    border-radius: 15px;
  }

  div.note-item {
    background: #f0eee7;
  }

  div.list-group-item {
    background: #f0eee7;
    border-radius: 15px;
  }

  div.note-comment {
    padding-left: 0;
    padding-right: 0;
  }

  div.note-item {
    margin-bottom: 20px;
  }

  p.content {
    margin-top: 10px;
  }

  div#pagination {
    margin: 10px 0;
  }

  div.note-form {
    margin: 20px 0;
    padding-right: 0;
    padding-left: 0;
  }

  input {
    margin: 20px 0;
    width: 100%;
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

</style>
