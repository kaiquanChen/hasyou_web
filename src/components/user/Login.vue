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
      <!--<kaptcha class="kaptcha" v-on:confirmSuccess="getkaptchaResult"></kaptcha>-->
      <el-input placeholder="请输入验证码"
                class="input-with-select"
                @keyup.enter.native="login()"
                v-model="kaptcha">
        <template slot="prepend"><img :src="src" @click="refreshCode()"></template>
      </el-input>
      <router-link id="login-error" v-if="error_message" to="">{{error_message}}</router-link>
      <router-link class="forget-password" to="">忘记密码?</router-link><br/>
      <el-button class="btn-login btn" slot="append" type="primary" @click="login()">登录</el-button>
      <el-button class="btn-reset btn" slot="append" type="primary" @click="goto()">注册</el-button>
    </div>
    <div class="col-lg-4"></div>
  </div>
</template>

<script>
  // import kaptcha from '@/components/kaptcha/kaptcha'
  import global_ from "../config/Global"
  import Bus from "../../js/bus"

  const kaptcha_url = global_.URLS.KAPTCHA_URL;
  const login_url = global_.URLS.LOGIN_URL;
    export default {
      name: "",
      // components: {
      //   kaptcha: kaptcha
      // },
      data() {
        return {
          account:"",
          password:"",
          kaptcha:"",
          error_message:"",
          src:kaptcha_url
        }
      },
      methods: {
        goto() {
          this.$router.push("/register");
        },
        refreshCode() {
          let signature = global_.FUNC.getUuid();
          this.src = kaptcha_url + "?t=" + signature;
          sessionStorage.setItem("signature", signature);
        },
        login() {
          this.error_message = "";
          if (!this.validateParam()) {
            return;
          }
          this.$http.post(login_url, {
            body: {
              account: this.account,
              password: this.password,
              signature: sessionStorage.getItem("signature"),
              kaptcha: this.kaptcha
            }
          }, {
            headers: {
              "bid":global_.FUNC.getBid()
            }
          }).then(data => {
            let res = data.body;
            if (res.code === 5003) {
              this.error_message = "验证码错误!";
              return;
            }

            if (res.code === 5006) {
              this.error_message = "账号或密码错误!";
              return;
            }

            if (res.code === 5001) {
              this.$router.push({path:"/register"});
              return;
            }

            let token = res.data.access_token;
            sessionStorage.setItem("access_token", token);
            Bus.$emit('login-status', token);
            this.$router.push({path:"/"});
          });
        },
        validateParam() {
          if (!this.account) {
            this.error_message = "账号不能为空!";
            return false;
          }

          if (!this.password) {
            this.error_message = "密码不能为空!";
            return false;
          }

          if (!this.kaptcha) {
            this.error_message = "验证码不能为空!";
            return false;
          }
          return true;
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

  #login-error {
    color: red;
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
