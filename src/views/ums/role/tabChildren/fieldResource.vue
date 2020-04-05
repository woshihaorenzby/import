<template>
    <div>
      <div v-if="fields!=null"  :key="'field'+fields.id">
        <el-row class="table-layout">
          <el-col :span="8"  :key="fields.id" style="padding: 4px 0">
            <el-checkbox v-model="resource.checked" @change="handleCheckChange(resource)">
              {{resource.name}}
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
        roleId:null,
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.getAllResourceList();
    },
    methods: {
      getAllResourceList(){
        fetchAllResourceList(this.roleId).then(response => {
          console.log(this.roleId)
          this.fields = response.data;
        });
      }
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
