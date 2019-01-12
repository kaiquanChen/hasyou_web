<template>
    <div class="row">
      <v-table
        is-horizontal-resize
        style="width:100%"
        :columns="columns"
        :table-data="tableData"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :cell-edit-done="cellEditDone"
      ></v-table>
      <div class="col-xs-12 col-lg-12" id="page">
        <el-pagination background
                       @current-change="handleCurrentChange"
                       :current-page.sync="page.p"
                       :page-size="page.count"
                       layout="total, prev, pager, next"
                       :total="page.total">
        </el-pagination>
      </div>
      <div class="col-lg-12 col-xs-12" id="add">
        <div class="col-lg-3"></div>
        <div class="col-lg-6 col-xs-12">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
</template>

<script>
  import global_ from "../config/Global"

  const list_note_url = global_.URLS.NOTE_URL + "subjects";
  const update_note_url = global_.URLS.NOTE_URL + "update";
  const create_note_url = global_.URLS.NOTE_URL + "create";

    export default {
        name: "",
        data() {
          return {
            page:{
              p: 1,
              count: 10,
              total: 0
            },
            tableData: [],
            columns:  [
              {field: 'title', title:'标题', width: 80, titleAlign: 'center',columnAlign:'center',isEdit:true,
                formatter: function (rowData,rowIndex,pagingIndex,field) {

                  return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                },isResize:true},
              {field: 'content', title: '内容', width: 350, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
              {field: 'create_time', title: '创建时间', width: 30, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
              {field: 'update_time', title: '更新时间', width: 30, titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true}
            ],
            ruleForm: {
              title: '',
              content: '',
            },
            rules: {
              title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
                { min: 2, max: 255, message: '长度在 2 到 2555 个字符', trigger: 'blur' }
              ],
              content: [
                { required: true, message: '请输入内容', trigger: 'blur' }
              ]
            },
          }
        },
      methods:{
          getNoteList() {
            this.$http.get(list_note_url, {
              params: {
                type: "NOTE",
                p: this.page.p,
                count: this.page.count
              },
              headers: {
                bid: global_.FUNC.getBid(),
                "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
              }
            }).then((data) => {
              let res = data.body;
              if (res.code === 5001) {
                this.$message.error("请先登录!");
                this.$router.push({path: "login"});
                return;
              }

              this.tableData = res.data.body;
              this.page.p = res.data.page;
              this.page.count = res.data.count;
              this.page.total = res.data.total;
            });
          },
          cellEditDone(newValue, oldValue, rowIndex, rowData, field){
            if (newValue == oldValue) {
              return;
            }
            rowData[field] = newValue;
            this.$http.post(update_note_url, {
              body: {
                id: rowData.id,
                title: rowData.title,
                content: rowData.content
              },
            }, {
              headers: {
                bid: global_.FUNC.getBid(),
                "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
              }
            }).then(data => {
              let res = data.body;
              if (res.code === 5001) {
                this.$message.error("请先登录!");
                this.$router.push({path: "login"});
                return;
              }

              this.tableData[rowIndex] = res.data;
            });
          },
          handleCurrentChange(val) {
            this.page.p = val;
            this.getNoteList();
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$http.post(create_note_url, {
                  body: {
                    type: "NOTE",
                    title: this.ruleForm.title,
                    content: this.ruleForm.content
                  }
                }, {
                  headers: {
                    bid: global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
                  }
                }).then(data => {
                  let res = data.body;
                  if (res.code === 5001) {
                    this.$message.error("请先登录!");
                    this.$router.push({path: "login"});
                    return;
                  }
                  this.tableData.push(res.data);
                  this.resetForm(formName);
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
      },
      created() {
          this.getNoteList();
      }
    }
</script>

<style scoped>
  #page {
    margin: 30px;
  }

  #add {
    margin: 30px;
  }
</style>
