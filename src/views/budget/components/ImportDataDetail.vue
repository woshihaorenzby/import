<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="importData" :rules="rules" ref="importDataFrom" label-width="150px">
      <el-form-item label="编号：" prop="code">
        <el-input v-model="importData.code"></el-input>
      </el-form-item>
      <el-form-item label="A信息：" prop="aInfo">
        <el-input v-model="importData.aInfo"></el-input>
      </el-form-item>
      <el-form-item label="旺旺号：" prop="wangwangId">
        <el-input v-model="importData.wangwangId"></el-input>
      </el-form-item>
      <el-form-item label="A金额：" prop="aPrice">
        <el-input v-model="importData.aPrice"></el-input>
      </el-form-item>
      <el-form-item label="店名：" prop="storeName">
        <el-input v-model="importData.storeName"></el-input>
      </el-form-item>
      <el-form-item label="B金额：" prop="bPrice">
        <el-input v-model="importData.bPrice"></el-input>
      </el-form-item>
      <el-form-item label="C佣金：" prop="commission">
        <el-input v-model="importData.commission"></el-input>
      </el-form-item>
      <el-form-item label="B信息：" prop="bInfo">
        <el-input v-model="importData.bInfo"></el-input>
      </el-form-item>
      <el-form-item label="备注1：" prop="remark1">
        <el-input v-model="importData.remark1"></el-input>
      </el-form-item>
      <el-form-item label="备注2：" prop="remark2">
        <el-input v-model="importData.remark2"></el-input>
      </el-form-item>
      <el-form-item label="备注3：" prop="remark3">
        <el-input v-model="importData.remark3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('importDataFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('importDataFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createImportData, getImportData, updateImportData} from '@/api/importData'
  const defaultImportData={
    wangwangId: '',
    commission: '0',
    aPrice: 0,
    aInfo: '',
    bPrice: '0',
    bInfo: '',
    storeName: '',
    remark1: '',
    remark2: '',
    remark3: '',
  };
  export default {
    name: 'ImportDataDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        importData:Object.assign({}, defaultImportData),
        rules: {
          // name: [
          //   {required: true, message: '请输入品牌名称', trigger: 'blur'},
          //   {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          // ],
          // logo: [
          //   {required: true, message: '请输入品牌logo', trigger: 'blur'}
          // ],
          // sort: [
          //   {type: 'number', message: '排序必须为数字'}
          // ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getImportData(this.$route.query.id).then(response => {
          this.importData = response.data;
        });
      }else{
        this.importData = Object.assign({},defaultImportData);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateImportData(this.$route.query.id, this.importData).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createImportData(this.importData).then(response => {
                  this.$refs[formName].resetFields();
                  this.importData = Object.assign({},defaultImportData);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({},defaultImportData);
      }
    }
  }
</script>
<style>
</style>


