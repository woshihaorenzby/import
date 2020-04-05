<template>
  <el-card class="form-container" shadow="never">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资源管理" name="first"><child1></child1></el-tab-pane>
      <el-tab-pane label="字段权限" name="second"></el-tab-pane>
    </el-tabs>
    <!--  <child1></child1>-->
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>
  </el-card>

</template>

<script>
  import {fetchAllResourceList} from '@/api/resource';
  import {listAllCate} from '@/api/resourceCategory';
  // import {listAllField} from '@/api/resourceCategory';
  import {listResourceByRole} from '@/api/role';
  import allocResource from './tabChildren/allocResource'
  export default {
    name: "tabs",
    components:{
      child1:allocResource,
    },
    data() {
      return {
        //默认第一个选项卡
        activeName: 'first',
        isChildUpdate1:true,
        isChildUpdate2:false,
        roleId: null,
        //字段权限
        fieldList:null,

      };
    },
    created() {
        this.roleId = this.$route.query.roleId;
    },
    methods: {
      handleClick(tab) {
        this.roleId = this.$route.query.roleId;
        console.log(this.roleId);
        if(tab.name=='first'){
          console.log('wwwwwwwwwwwwwwwwwww'+allocResource);
        }else if(tab.name=='second'){
        }
      }
      // getAllResourceList() {
      //   fetchAllResourceList().then(response => {
      //     this.allResource = response.data;
      //     for (let i = 0; i < this.allResource.length; i++) {
      //       this.allResource[i].checked = false;
      //     }
      //     this.getResourceByRole(this.roleId);
      //   });
      // },
      // getAllResourceCateList() {
      //   listAllCate().then(response => {
      //     this.allResourceCate = response.data;
      //     console.log(this.allResourceCate);
      //     for (let i = 0; i < this.allResourceCate.length; i++) {
      //       this.allResourceCate[i].checked = false;
      //     }
      //     this.getAllResourceList();
      //   });
      // },
      // getResourceByCate(categoryId) {
      //   let cateResource = [];
      //   if (this.allResource == null) return null;
      //   for (let i = 0; i < this.allResource.length; i++) {
      //     let resource = this.allResource[i];
      //     if (resource.categoryId === categoryId) {
      //       cateResource.push(resource);
      //     }
      //   }
      //   return cateResource;
      // },
      // getResourceByRole(roleId){
      //   listResourceByRole(roleId).then(response=>{
      //     let allocResource = response.data;
      //     this.allResource.forEach(item=>{
      //       item.checked = this.getResourceChecked(item.id,allocResource);
      //     });
      //     this.allResourceCate.forEach(item=>{
      //       item.checked = this.isAllChecked(item.id);
      //     });
      //     this.$forceUpdate();
      //   });
      // },
      // getResourceChecked(resourceId,allocResource){
      //   if(allocResource==null||allocResource.length===0) return false;
      //   for(let i=0;i<allocResource.length;i++){
      //     if(allocResource[i].id===resourceId){
      //       return true;
      //     }
      //   }
      //   return false;
      // },
      // isIndeterminate(categoryId) {
      //   let cateResources = this.getResourceByCate(categoryId);
      //   if (cateResources == null) return false;
      //   let checkedCount = 0;
      //   for (let i = 0; i < cateResources.length; i++) {
      //     if (cateResources[i].checked === true) {
      //       checkedCount++;
      //     }
      //   }
      //   return !(checkedCount === 0 || checkedCount === cateResources.length);
      // },
      // isAllChecked(categoryId) {
      //   let cateResources = this.getResourceByCate(categoryId);
      //   if (cateResources == null) return false;
      //   let checkedCount = 0;
      //   for (let i = 0; i < cateResources.length; i++) {
      //     if (cateResources[i].checked === true) {
      //       checkedCount++;
      //     }
      //   }
      //   if(checkedCount===0){
      //     return false;
      //   }
      //   return checkedCount === cateResources.length;
      // },
      // handleSave() {
      //   this.$confirm('是否分配资源？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     let checkedResourceIds = new Set();
      //     if (this.allResource != null && this.allResource.length > 0) {
      //       this.allResource.forEach(item => {
      //         if (item.checked) {
      //           checkedResourceIds.add(item.id);
      //         }
      //       });
      //     }
      //     let params = new URLSearchParams();
      //     params.append("roleId", this.roleId);
      //     params.append("resourceIds", Array.from(checkedResourceIds));
      //     allocResource(params).then(response => {
      //       this.$message({
      //         message: '分配成功',
      //         type: 'success',
      //         duration: 1000
      //       });
      //       this.$router.back();
      //     })
      //   })
      // },
      // handleClear() {
      //   this.allResourceCate.forEach(item => {
      //     item.checked = false;
      //   });
      //   this.allResource.forEach(item => {
      //     item.checked = false;
      //   });
      //   this.$forceUpdate();
      // },
      // handleCheckAllChange(cate) {
      //   let cateResources = this.getResourceByCate(cate.id);
      //   for (let i = 0; i < cateResources.length; i++) {
      //     cateResources[i].checked = cate.checked;
      //   }
      //   this.$forceUpdate();
      // },
      // handleCheckChange(resource) {
      //   this.allResourceCate.forEach(item=>{
      //     if(item.id===resource.categoryId){
      //       item.checked = this.isAllChecked(resource.categoryId);
      //     }
      //   });
      //   this.$forceUpdate();
      // }
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
