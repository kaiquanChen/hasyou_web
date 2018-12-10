<template>
  <div class="row login">
    <h1>欢迎登录-有你</h1>
    <div class="col-lg-4"></div>
    <div class="col-lg-4 col-xs-12">
      <el-input placeholder="邮箱 / 电话 / 昵称"
                v-model="account"
                class="input-with-select">
        <i class="glyphicon glyphicon-user el-input__icon"
          slot="prefix">
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
      <el-input placeholder="请输入验证码" v-model="captcha" class="captcha-input">
        <template slot="prepend" class="captcha-parent">
          <img class="captcha" alt="验证码" :src="src" @click="refreshCode">
        </template>
      </el-input>
      <router-link class="forget-password" to="">忘记密码?</router-link><br/>
      <el-button class="btn-login btn" slot="append" type="primary" @click="login()" >登录</el-button>
      <el-button class="btn-reset btn" slot="append" type="primary" @click="goto()">注册</el-button>
    </div>
    <div class="col-lg-4"></div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  const captcha_url = global_.URLS.CAPTCHA_URL;
    export default {
      name: "",
      data() {
        return {
          account:"",
          password:"",
          captcha: "",
          src:"captcha.jpg"
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
    height: 40px;
  }

  .captcha-input {
    margin-top: 10px;
  }

  .input-with-select {
    margin-top: 10px;
  }
</style>
