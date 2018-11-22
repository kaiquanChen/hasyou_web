<template>
  <div class="container-fluid">
    <div v-if="value === 1">1</div>
    <div v-else-if="value">2</div>
    <div v-else>3</div>
  </div>
</template>

<script>
  import global_ from "./config/Global"
    export default {
        name: "",
      data() {
        return {
          value:null,
          result:{}
        };
      },
      methods: {
          test() {
            axios.post("http://localhost:8028/test3", {
              body:{
                name:"hello",
                age:11
              },
            },{headers: {
                "bid":global_.FUNC.getBid()
              }}).then( (data) => {
              console.log(data.body);
            });
        },
        test2() {
          axios.get("http://localhost:8028/test", {
            params:{
              name:"david"
            },
            headers: {
              "bid": global_.FUNC.getBid()
            }
          },
          ).then((data) => {
            console.log(data.body);
          });
        },
        test3() {
            axios.request({
              url:'http://localhost:8028/test',
              method:'get',
              params:{
                name:"david"
              },
              transformRequest:[
                function (data, headers) {
                console.log("david");
                  return data;
                }
              ],
              transformResponse:[
                function (data) {
                  console.log(data);
                }
              ],
              headers:{
                "bid":global_.FUNC.getBid()
              }
            });
        },
        test4() {
            let params = {name:'david'};
            global_.FUNC.request("http://localhost:8028/test", this.result, params); // 异步
        }
      },
      created() {
          this.test2();
      }
    }
</script>

<style scoped>

</style>
