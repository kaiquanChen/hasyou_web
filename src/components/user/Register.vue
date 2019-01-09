s<template>
  <div class="row">
    <h1>欢迎注册-有你</h1>
    <div class="col-lg-3"></div>
    <div class="col-lg-6 col-xs-12">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="头像" class="avatar-upload">
          <el-upload
            class="upload-avatar"
            :action="file_upload_url"
            :data="file"
            :on-success="fileUploadSuccess()"
            :on-progress="fileProgress()"
            :file-list="avatar"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input @blur="checkAccount(ruleForm.nickname, '该昵称')" v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input @blur="checkAccount(ruleForm.mobile, '该号码')" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input @blur="checkAccount(ruleForm.email, '该邮箱')" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-form-item prop="birthday">
            <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="性别" class="form-itetm-gender" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-item-address" label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register()">立即注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="col-lg-3"></div>
  </div>
</template>

<script>
  import Captcha from '@/components/captcha/Captcha'
  import global_ from "../config/Global"

  const captcha_url = global_.URLS.CAPTCHA_URL;
  const register_url = global_.URLS.REGISTER_URL;
  const file_upload_url = global_.URLS.FILE_URL + "save";
  const verify_account_url = global_.URLS.VERIFY_ACCOUNT_URL;
  export default {
      name: "",
      components: {
        captcha: Captcha
      },
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
            confirmSuccess:true,
            file:{
              title:"avatar"
            },
            error: {
              "nickname_error":"* 昵称不能为空"
            },
            can_submit:true,
            file_upload_url: file_upload_url,
            avatar:[],
            ruleForm: {
              nickname: '',
              password: '',
              birthday: '',
              gender: 0,
              description: '',
              mobile:"",
              email:"",
              address:""
            },
            rules: {
              nickname: [
                { required: true, message: '请输入昵称', trigger: 'blur' },
                { min: 3, max: 55, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'change' }
              ],
              birthday: [
                { required: false, message: '请选择日期', trigger: 'change' }
              ],
              description: [
                { required: false, message: '', trigger: 'blur' }
              ],
              address: [
                { required: false, message: '', trigger: 'blur' }
              ]
            }}
        },
        methods: {
          fileUploadSuccess() {
            this.can_submit = true;
          },
          fileProgress() {
            this.can_submit = false;
          },
          handleItemChange(val) {

          },
          checkAccount(account, type) {
            if (!account) {
              return;
            }

            this.$http.post(verify_account_url, {
              body: {
                account: account
              }
            }, {
              headers: {
                bid: global_.FUNC.getBid()
              },
            }).then(data => {
              let res = data.body;
              if (res.code === 5005) {
                this.$message.error(type + " 已被占用");
                this.can_submit = false;
                return;
              }
              this.can_submit = true;
            });
          },
          register() {
            if (!this.confirmSuccess) {
              this.$message.error("验证码错误!");
              return;
            }

            this.$http.post(register_url, {
              body:this.ruleForm
            }, {
              headers: {
                bid: global_.FUNC.getBid()
              },
            }).then(data => {
              if (data.code !== 200) {
                this.$message.error("注册失败！");
                return;
              }

              this.$router.push({path:"/login"});
            });
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
          },
          getCaptchaResult(val) {
            this.confirmSuccess = val;
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          handleItemChange() {

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
    margin-top: 20px;
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

  div.complex-info {
    padding-left: 0;
  }

  .upload-avatar {
    text-align: left;
  }

  .form-itetm-gender {
    text-align: left;
  }

  /*.form-item-address {*/
  /*}*/

  @media screen and (max-width: 415px) {

  }

</style>
