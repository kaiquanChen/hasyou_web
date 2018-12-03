<template>
  <div class="row">
    <h1>欢迎登录-有你</h1>
    <div class="col-lg-4"></div>
    <div class="col-lg-4 col-xs-12">
      <el-input placeholder="邮箱 / 电话 / 昵称"
                v-model="account"
                class="input-with-select">
        <i
          class="glyphicon glyphicon-user el-input__icon"
          slot="prefix"
          @click="handleIconClick">
        </i>
      </el-input>
      <el-input type="password"
                v-model="password"
                placeholder="密码"
                class="input-with-select ">
        <i
          class="glyphicon glyphicon-option-horizontal el-input__icon"
          slot="prefix"
          @click="handleIconClick">
        </i>
      </el-input>
      <router-link class="forget-password" to="">忘记密码?</router-link><br/>
      <el-button class="btn-login btn" slot="append" type="primary" @click="login()" >登录</el-button>
      <el-button class="btn-reset btn" slot="append" type="primary" @click="goto()">注册</el-button>
    </div>
    <div class="col-lg-4"></div>
  </div>
</template>

<script>
    export default {
      name: "",
      data() {
        return {
          "account":"",
          "password":""
        }
      },
      methods: {
        goto() {
          this.$router.push("/register");
        },
        login() {

        }
      }
    }
</script>

<style scoped>
  .row {
    text-align: center;
  }

  .btn {
    margin-top: 40px;
  }

  .forget-password {
    margin-top: 5px;
    float: right;
  }
</style>
