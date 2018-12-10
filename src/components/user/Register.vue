<template>
  <div class="row">
    <h1>欢迎注册-有你</h1>
    <div class="col-lg-4"></div>
    <div class="col-lg-4 col-xs-12">
      <el-input placeholder="请输入昵称"
                v-model="user.nickname"
                class="input-with-select register">
        <template class="register-prefix" slot="prepend">昵称</template>
      </el-input>
      <el-input type="password"
                v-model="user.password"
                placeholder="请输入登录密码"
                class="input-with-select register">
        <template class="register-prefix" slot="prepend">密码</template>
      </el-input>
      <el-input type="text"
                v-model="user.mobile"
                placeholder="请输入电话"
                class="input-with-select register">
        <template class="register-prefix" slot="prepend">电话</template>
      </el-input>
      <el-input type="text"
                v-model="user.email"
                placeholder="请输入邮箱"
                class="input-with-select register">
        <template class="register-prefix" slot="prepend">邮箱</template>
      </el-input>
      <el-date-picker
        :editable="false"
        type="date"
        placeholder="生日"
        class="register"
        v-model="user.birthday"
        style="width: 100%;">
      </el-date-picker>
      <div class="col-xs-12 register info">
        <el-radio-group v-model="user.gender" class="register gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
        <el-cascader
          class="register address"
          :options="locs"
          @active-item-change="handleItemChange"
          :props="props"
          placeholder="所在城市"></el-cascader>
      </div>
      <el-input type="textarea" class="register" v-model="user.description" placeholder="个性签名"></el-input>
      <el-input placeholder="请输入验证码" v-model="captcha" class="captcha-input">
        <template slot="prepend" class="captcha-parent"><img class="captcha" alt="验证码" :src="src" @click="refreshCode"></template>
      </el-input>
      <el-button class="btn-login btn" slot="append" type="primary" @click="register()" >提交</el-button>
      <el-button class="btn-reset btn" slot="append" @click="clear()">重置</el-button>
    </div>
    <div class="col-lg-4"></div>
  </div>
</template>

<script>
  import global_ from "../config/Global"
  const captcha_url = global_.URLS.CAPTCHA_URL;
  const register_url = global_.URLS.REGISTER_URL;
    export default {
      name: "",
      data() {
        return {
          user:{
            nickname: "",
            password: "",
            birthday: "",
            gender: 0,
            description: "",
            mobile: "",
            email: "",
            location: "",
          },
          locs:[{
            label: '江苏',
            cities: []
          }, {
            label: '浙江',
            cities: []
          }],
          props:{
            value: 'label',
            children: "cities"
          },
          captcha:"",
          src:"captcha.jpg"
        }
      },
      methods: {
        handleItemChange(val) {

        },
        register() {

        },
        refreshCode() {
          this.src = captcha_url + "?t=" + Date.now();
        },
        clear() {
          this.user.username = "";
          this.user.password = "";
          this.user.birthday = "";
          this.user.gender = "";
          this.user.description = "";
          this.user.mobile = "";
          this.user.email = "";
          this.user.location = "";
          this.captcha = "";
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
  }

  .btn {
    margin-top: 40px;
  }

  .register {
    margin-top: 10px;
  }

  .address {
    float: right;
  }

  .gender {
    margin-top: 18px;
    float: left;
  }

  div.info {
    margin-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  div.row {
    height: 690px;
  }

  .captcha {
    height: 40px;
  }

  .captcha-input {
    margin-top: 10px;
  }
</style>
