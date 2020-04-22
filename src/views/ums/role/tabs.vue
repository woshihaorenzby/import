<template>
  <el-card class="form-container" shadow="never">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资源管理" name="first"><child1 ref="child1" @parentEvent1="toClick1"></child1></el-tab-pane>
      <el-tab-pane label="字段权限" name="second"><child2 ref="child2" @parentEvent2="toClick2"></child2></el-tab-pane>
    </el-tabs>
    <!--  <child1></child1>-->
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>
  </el-card>
</template>

<script>
  import child1 from './tabChildren/allocResource'
  import child2 from './tabChildren/fieldResource'
  import {allocResource} from '@/api/role'
  export default {
    name: "tabs",
    components:{
      child1,
      child2,
    },
    data() {
      return {
        //默认第一个选项卡
        activeName: 'first',
        isChildUpdate1:true,
        isChildUpdate2:false,
        roleId: null,
        flag:0,
        //资源列表
        allResource: null,
        allResourceCate: null,
        //字段权限
        fieldList:[],
      };
    },
    created() {
        this.roleId = this.$route.query.roleId;
    },
    methods: {
      handleClick(tab) {
        this.activeName = tab.name;
      },
      handleSave() {
        this.$confirm('是否分配资源？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let checkedResourceIds = new Set();
          if (this.allResource != null && this.allResource.length > 0) {
            this.allResource.forEach(item => {
              if (item.checked) {
                checkedResourceIds.add(item.id);
              }
            });
          }
          let params = new URLSearchParams();
          params.append("roleId", this.roleId);
          params.append("resourceIds", Array.from(checkedResourceIds));
          params.append("fields",JSON.stringify(this.fieldList));
          allocResource(params).then(response => {
            this.$message({
              message: '分配成功',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          })
        })
      },
      handleClear() {
        this.allResourceCate.forEach(item => {
          item.checked = false;
        });
        this.allResource.forEach(item => {
          item.checked = false;
        });
        this.$forceUpdate();
      },
      toClick1: function (allResource){
        this.allResource = allResource;
      },
      toClick2: function (fieldList){
        this.fieldList = fieldList;
        console.log(fieldList);
      }
    }
  }
</script>

