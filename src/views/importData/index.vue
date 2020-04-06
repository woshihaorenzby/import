<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">


      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>

        <el-button
          style="float: right"
          @click="searchBrandList()"
          type="primary"
          size="small">
          查询结果
        </el-button>

      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="品牌名称/关键字"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addBrand()"
        size="mini">
        添加
      </el-button>
      <el-button type="primary" @click="dialogFormVisible = true" style="float: right;text-align: center" size="mini">
        上传数据
      </el-button>
      <el-dialog title="上传数据" :visible.sync="dialogFormVisible" style="text-align: center;width: 100%;">
        <el-button type="text" @click="getTamplate">下载模板</el-button>
        <el-upload
          class="upload-demo"
          :on-change="handleChange"
          :file-list="fileList">
          <el-button size="small" type="primary" style='text-align: center'>点击上传</el-button>

        </el-upload>
      </el-dialog>
    </el-card>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="num"
        label="数据"
        sortable
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,getTamplate} from '@/api/importData'

  export default {
    name: 'importDataList',
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        tableData: [],
        operateType: null,
        listQuery: {
          keyword: null,
          pageNum: 1,
          pageSize: 10
        },
        list: null,
        total: null,
        listLoading: true,
        multipleSelection: []
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getTamplate(){
        getTamplate();
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.tableData = response.data.list;
          this.total = response.data.total;
          this.totalPage = response.data.totalPage;
          this.pageSize = response.data.pageSize;
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-dialog {
    width: 25%;
  }

  .el-dialog__body {
    text-align: center;
  }

  .el-dialog__header {
    text-align: center;
  }

</style>


