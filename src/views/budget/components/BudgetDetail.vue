<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="budget" :rules="rules" ref="budgetFrom" label-width="150px">
      <el-form-item label="交易日期：" prop="tradeData">
        <el-date-picker type="date" placeholder="选择日期" disabled="{budget.tradeData===null}" v-model="budget.tradeData" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="店名：" prop="storeName">
        <el-input v-model="budget.storeName" disabled="{budget.storeName==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-input v-model="budget.type" disabled="{budget.type==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="金额相关备注：" prop="amountRemark">
        <el-input v-model="budget.amountRemark" disabled="{budget.amountRemark==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="支出金额：" prop="pay">
        <el-input v-model="budget.pay" disabled="{budget.pay==='-1'}"></el-input>
      </el-form-item>
      <el-form-item label="收入金额：" prop="income">
        <el-input v-model="budget.income" disabled="{budget.income==='-1'}"></el-input>
      </el-form-item>
      <el-form-item label="支出方名称：" prop="payName">
        <el-input v-model="budget.payName" disabled="{budget.payName==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="支出方备注：" prop="payRemark">
        <el-input v-model="budget.payRemark" disabled="{budget.payRemark==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="支出方账户：" prop="payAccount">
        <el-input v-model="budget.payAccount" disabled="{budget.payAccount==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="收入方名称：" prop="incomeName">
        <el-input v-model="budget.incomeName" disabled="{budget.incomeName==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="收入方账户：" prop="incomeAccount">
        <el-input v-model="budget.incomeAccount" disabled="{budget.incomeAccount==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="收入方备注：" prop="incomeRemark">
        <el-input v-model="budget.incomeRemark" disabled="{budget.incomeRemark==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="budget.remark" disabled="{budget.remark==='*'}"></el-input>
      </el-form-item>
      <el-form-item label="核对人：" prop="checkName">
        <el-input v-model="budget.checkName" disabled="{budget.checkName==='*'}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('budgetFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('budgetFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createImportData, getImportData, updateImportData} from '@/api/budget'

  const defaultBudget = {
    // 交易日期
    tradeData: null,
    // 店名
    storeName: "*"?"":"",
    // 类别
    type: "",
    // 金额相关备注
    amountRemark: "",
    // 支出金额
    pay: 0,
    // 收入金额
    income: 0,
    // 支出方名称
    payName: "",
    // 支出方备注
    payRemark: "",
    // 支出方账户
    payAccount: "",
    // 收入方名称
    incomeName: "",
    // 收入方账户
    incomeAccount: "",
    // 收入方备注
    incomeRemark: "",
    // 备注
    remark: "",
    // 核对人
    checkName: "",
  };
  export default {
    name: 'BudgetDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        budget: Object.assign({}, defaultBudget),
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
          this.budget = response.data;
        });
      } else {
        this.budget = Object.assign({}, defaultBudget);
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
                updateImportData(this.$route.query.id, this.budget).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createImportData(this.budget).then(response => {
                  this.$refs[formName].resetFields();
                  this.budget = Object.assign({}, defaultBudget);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.budget = Object.assign({}, defaultBudget);
      }
    }
  }
</script>
<style>
</style>


