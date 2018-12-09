<template>
  <div class="container-fluid">
    <div class="col-lg-12 col-xs-12" v-for="(item, index) in param">
      {{item}}
    </div>
    <el-button @click="add()">添加</el-button>
  </div>
</template>

<script>
  import global_ from "./config/Global"
    export default {
      data() {
        return {
          imageUrl: '',
          param:[
            "1", "2", "3", "4"
          ]
        };
      },
      methods: {
        add() {
          this.param.push("a");
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        handleScroll() {
          // let top = global_.FUNC.getScrollTop();
          // console.log(top);
          let height = global_.FUNC.isReachBottom();
          console.log(height);
        },
      },
      created() {
      },
      mounted () {
        window.addEventListener('scroll', this.handleScroll)
      },
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
