<template>
    <div class="row">
      <div class="col-xs-12 col-lg-12">
        <div class="col-xs-6 col-lg-3">
          <div class="col-xs-12 col-lg-12 image-list" v-for="(item, index) in files1">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.file_url" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <time class="time">真漂亮!</time>
                  <!--<el-button type="text" class="button">操作按钮</el-button>-->
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div class="col-xs-6 col-lg-3">
          <div class="col-xs-12 col-lg-12 image-list" v-for="(item, index) in files2">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.file_url" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <time class="time">真漂亮!</time>
                  <!--<el-button type="text" class="button">操作按钮</el-button>-->
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="col-xs-12 col-lg-12 image-list" v-for="(item, index) in files3">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.file_url" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <time class="time">真漂亮!</time>
                  <!--<el-button type="text" class="button">操作按钮</el-button>-->
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="col-xs-12 col-lg-12 image-list" v-for="(item, index) in files4">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.file_url" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <time class="time">真漂亮!</time>
                  <!--<el-button type="text" class="button">操作按钮</el-button>-->
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div class="row" style="text-align: center">
        <el-pagination background
                       class="pagination"
                       @current-change="handleCurrentChange"
                       :current-page.sync="page.page"
                       :page-size="page.count"
                       :small="checkMedia()"
                       :pager-count="pager_count"
                       layout="total, prev, pager, next"
                       :total="page.total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import global_ from "../config/Global"
  const file_url = global_.URLS.FILE_LIST_URL;
    export default {
      name: "",
      data() {
        return {
          files: [],
          page: {
            p: 1,
            count: 10,
            total: 0
          },
          pager_count:10,
          col: 4,
          files1:[],
          files2:[],
          files3:[],
          files4:[]
        }
      },
      methods: {
        getFileList() {
          this.$http.get(file_url + "getByTitle/aly", {
            params:{
              p: this.page.p,
              count: this.page.count
            },
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then( data => {
            if (data.body.data === 200) {
              console.log(data);
              this.$message.error("数据获取失败");
              return;
            }
            this.page.p = data.body.data.page;
            this.page.count = data.body.data.count;
            this.page.total = data.body.data.total;
            this.files = data.body.data.body

            this.allocateImage();
          });
        },
        handleCurrentChange(val) {
          this.page.p = val;
          this.getFileList();
        },
        checkMedia() {
          return window.matchMedia('(max-width:415px)').matches;
        },
        allocateImage() {
          let i1 = 0, i2 = 0, i3 = 0, i4 = 0;
          for (let i = 0; i < this.files.length; i++) {
            let result = i % this.col;
            if (result === 0) {
              this.files1[i1++] = this.files[i];
            } else if (result === 1) {
              this.files2[i2++] = this.files[i];
            } else if (result === 2) {
              this.files3[i3++] = this.files[i];
            } else if (result === 3) {
              this.files4[i4++] = this.files[i];
            }
          }
        },
        scrollEvent() {

        }
      },
      created() {
        if (this.checkMedia()) {
          this.pager_count = 5;
          this.col = 2;
        }
        this.getFileList();
      },
      mounted() {
        window.addEventListener("scroll", this.scrollEvent);
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .image-list {
    margin-top: 30px;
    padding-right: 0;
    padding-left: 0;
  }

</style>
