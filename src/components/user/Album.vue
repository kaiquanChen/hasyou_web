<template>
    <div class="row">
      <div class="col-xs-12 col-lg-12">
        <div ref="element1" class="col-xs-6 col-lg-3">
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
        <div ref="element2" class="col-xs-6 col-lg-3">
          <div class="col-xs-12 col-lg-12 image-list" v-for="(item, index) in files2">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.file_url" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <time class="time">真漂亮!</time>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div ref="element3" class="col-lg-3">
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
        <div ref="element4" class="col-lg-3">
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
      <div class="col-lg-12 col-xs-12 notice">
        <span>{{notice}}</span>
      </div>
    </div>
</template>

<script>
  import Vue from "vue"
  import global_ from "../config/Global"
  const file_url = global_.URLS.FILE_LIST_URL;
    export default {
      name: "",
      data() {
        return {
          files: [],
          page: {
            p: 1,
            count: 20,
            total: 0
          },
          col: 4,
          files1:[],
          files2:[],
          files3:[],
          files4:[],
          notice:"上拉加载更多!"
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
            } else if (data.body.data.body.length === 0) {
              this.$message("数据已加载完!");
              this.notice = "没有更多了!";
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
          for (let i = 0; i < this.files.length; i++) {
            let result = i % this.col;
            if (result === 0) {
              this.files1.push(this.files[i]);
            } else if (result === 1) {
              this.files2.push(this.files[i]);
            } else if (result === 2) {
              this.files3.push(this.files[i]);
            } else if (result === 3) {
              this.files4.push(this.files[i]);
            }
          }
        },
        scrollEvent() {
          let is_bottom = global_.FUNC.isReachBottom();
          if (is_bottom) {
            this.page.p = this.page.p + 1;
            this.getFileList();
          }
        },
        minHeightOfDivs() {
          let $element1_height = this.$refs.element1.offsetHeight;
          let $element2_height = this.$refs.element2.offsetHeight;

          let index = 1;
          let min = $element1_height;
          if (min > $element2_height) {
            min = $element2_height;
            index = 2;
          }

          if (this.col === 2) {
            return index;
          } else {
            let $element3_height = this.$refs.element3.offsetHeight;
            let $element4_height = this.$refs.element4.offsetHeight;

            if (min > $element3_height) {
              min = $element3_height;
              index = 3;
            }

            if (min > $element4_height) {
              index = 4;
            }

            return index;
          }
        }
      },
      created() {
        if (this.checkMedia()) {
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

  .notice {
    margin-top: 15px;
    text-align: center;
    color: #ccc;
  }

</style>
