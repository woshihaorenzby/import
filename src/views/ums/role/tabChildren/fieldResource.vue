<template>
  <div>
    <div v-for="(cate,index) in fieldsMap" :class="index===0?'top-line':null" :key="cate.key">
      <el-row class="table-layout" style="background: #F2F6FC;">
        <el-checkbox v-model="cate.checked"
                     @change="handleCheckAllChange(cate)">
          {{cate.name}}
        </el-checkbox>
      </el-row>
      <el-row class="table-layout">
        <el-col :span="8" v-for="resource in cate.list" :key="resource.name" style="padding: 4px 0">
          <el-checkbox v-model="resource.checked"  :checked="resource.check===1?true:false" @change="handleCheckedCitiesChange(resource)">
            {{resource.title}}
          </el-checkbox>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {fetchAllResourceList} from '@/api/importField';
  export default {
    name: 'child2',
    data() {
      return {
        //资源列表
        fields: null,
        roleId: null,
        checkAll: false,
        checkedCities: new Map(),
        fieldsMap: [],
        cityOptions:new Map(),
      isIndeterminate: true,
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.getAllResourceList();
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities.set(val.key,(val.checked ? this.cityOptions.get(val.key) : [])) ;
        this.cityOptions.get(val.key).forEach(item=>{
          item.checked=val.checked;
        });
        this.$emit("parentEvent2",this.checkedCities);
      },
      handleCheckedCitiesChange(value) {
        let key = value.name.split("_")[0];
        let hasCheckList = this.checkedCities.get(key);
        let newCheckList = [];
        hasCheckList.forEach(item=>{
          if(item.name!==value.name){
            newCheckList.push(item);
          }
        });
        if(value.checked){
          newCheckList.push(value);
        }
        this.fieldsMap.forEach(item=>{
          if(item.key===key){
            item.checked=newCheckList.length===this.cityOptions.get(key).length;
          }
        });
        this.checkedCities.set(key,newCheckList);
        this.$emit("parentEvent2",this.checkedCities);
      },
      getAllResourceList() {
        fetchAllResourceList(this.roleId).then(response => {
          response.data.forEach(item=>{
            console.log(item);
            let key = item.key;
            let list = item.list;
            this.cityOptions.set(key,list);
            let hasCheck = [];
            list.forEach(i=>{
              if(i.check===1){
                hasCheck.push(i);
              }
            });
            item.checked=hasCheck.length===list.length;
            this.checkedCities.set(key,hasCheck);
            this.$emit("parentEvent2",this.checkedCities);
          });
          this.fieldsMap = response.data;
        });
      },
    }
  }

</script>
<style scoped>
  .table-layout {
    padding: 20px;
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
  }

  .top-line {
    border-top: 1px solid #DCDFE6;
  }
</style>
