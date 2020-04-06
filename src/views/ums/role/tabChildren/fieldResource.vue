<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city.name" :key="city.title" :checked="city.check===1?true:false">{{city.title}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
  import {fetchAllResourceList} from '@/api/importField';
  const cityOptions = [];
  export default {
    name: 'child2',
    data() {
      return {
        //资源列表
        fields: null,
        roleId: null,
        checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: true,
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.getAllResourceList();
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
        this.$emit("parentEvent2",this.checkedCities);
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        this.$emit("parentEvent2",this.checkedCities);
      },
      getAllResourceList() {
        fetchAllResourceList(this.roleId).then(response => {
          response.data.forEach(item=>{
            cityOptions.push(item.name);
            this.$emit("parentEvent2",this.checkedCities);
          });
          this.cities = response.data;
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
