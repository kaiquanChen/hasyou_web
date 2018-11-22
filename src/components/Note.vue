<template>
  <div class="row">
    <div class="col-lg-12 col-xs-12">
      <!--留言列表-->
    </div>

    <div class="col-lg-12 col-xs-12">
      <!--提交表单-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <form action="">

      </form>
    </div>
  </div>
</template>

<script>
  import global_ from "./config/Global"
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请填写意见标题', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: false, message: '请填写内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        console.log(ruleForm.name);
      }
    },
    created() {
    }
  };
</script>

<style scoped>
</style>
