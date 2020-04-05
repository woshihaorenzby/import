<template>
  <el-card class="form-container" shadow="never">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资源管理" name="first"><child1 ref="child1"></child1></el-tab-pane>
      <el-tab-pane label="字段权限" name="second"><child2 ref="child2"></child2></el-tab-pane>
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
        fieldList:null,


      };
    },
    created() {
        this.roleId = this.$route.query.roleId;
    },
    methods: {
      handleClick(tab) {
        if(tab.name=='first'&&this.flag<=0){
          this.flag++;
        }else if(tab.name=='second'){
        }
      }
    }
  }
</script>

