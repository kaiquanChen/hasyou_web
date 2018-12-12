<template>
  <div class="row login">
    <h1>欢迎登录-有你</h1>
    <div class="col-lg-4"></div>
    <div class="col-lg-4 col-xs-12">
      <el-input placeholder="邮箱 / 电话 / 昵称"
                v-model="account"
                class="input-with-select">
        <i class="glyphicon glyphicon-user el-input__icon" slot="prefix">
        </i>
      </el-input>
      <el-input type="password"
                v-model="password"
                placeholder="密码"
                class="input-with-select ">
        <i class="glyphicon glyphicon-option-horizontal el-input__icon"
          slot="prefix">
        </i>
      </el-input>
      <captcha class="captcha" v-on:confirmSuccess="getCaptchaResult"></captcha>
      <router-link class="forget-password" to="">忘记密码?</router-link><br/>
      <el-button class="btn-login btn" slot="append" type="primary" @click="login()" >登录</el-button>
      <el-button class="btn-reset btn" slot="append" type="primary" @click="goto()">注册</el-button>
    </div>
    <div class="col-lg-4"></div>
  </div>
</template>

<script>
  import Captcha from '@/components/captcha/Captcha'
  import global_ from "../config/Global"
  const captcha_url = global_.URLS.CAPTCHA_URL;
    export default {
      name: "",
      components: {
        captcha: Captcha
      },
      data() {
        return {
          account:"",
          password:"",
          confirmSuccess: false
        }
      },
      methods: {
        goto() {
          this.$router.push("/register");
        },
        refreshCode() {
          this.src = captcha_url + "?t=" + Date.now();
        },
        login() {
          if (!this.confirmSuccess) {
            this.$message.error("验证码错误!");
            return;
          }

          this.$http.post().then(data => {

          });
        },
        getCaptchaResult(val) {
          this.confirmSuccess = val;
        }
      },
      created() {
        this.refreshCode();
      }
    }
</script>

<style scoped>
  .row {
    text-align: center;
    height: 690px;
  }

  .btn {
    margin-top: 40px;
  }

  .forget-password {
    margin-top: 5px;
    float: right;
  }

  .captcha {
    margin-top: 10px;
  }

  .input-with-select {
    margin-top: 10px;
  }

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
