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
      <!--      <el-button-->
      <!--        class="btn-add"-->
      <!--        @click="addBrand()"-->
      <!--        size="mini">-->
      <!--        添加-->
      <!--      </el-button>-->
      <el-button type="primary" @click="dialogFormVisible = true" style="float: right;text-align: center" size="mini">
        上传数据
      </el-button>
      <el-dialog title="上传数据" :visible.sync="dialogFormVisible" style="text-align: center;width: 100%;">
        <el-button type="text" @click="getTamplate">下载模板</el-button>
        <el-upload
          class="upload-file"
          :action="uploadExcel"
          :on-error="handelOnError"
          :on-success="handleSuccess"
          :before-upload="handelBeforeUpload"
          :limit="1"
          :data="excelParam"
          accept=".xlsx,.xls"
          :show-file-list="false"
          :headers="headers"
          :file-list="fileList"
            >
          <el-button type="text"  size="small">导入excle</el-button>
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
      v-loading="listLoading"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="编号" width="100" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="日期" sortable width="120">
        <template slot-scope="scope">{{ scope.row.addTime|formatCreateTime}}</template>
      </el-table-column>
      <el-table-column label="旺旺号" sortable width="120" >
        <template slot-scope="scope">{{ scope.row.wangwangId}}</template>
      </el-table-column>
      <el-table-column label="佣金" sortable show-overflow-tooltip prop="commission">
      </el-table-column>
      <el-table-column label="A金额" sortable show-overflow-tooltip prop="aPrice">
      </el-table-column>
      <el-table-column label="A信息" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.aInfo}}</template>
      </el-table-column>
      <el-table-column label="B金额" sortable show-overflow-tooltip prop="bPrice">
      </el-table-column>
      <el-table-column label="B信息" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.bInfo}}</template>
      </el-table-column>
      <el-table-column label="店铺" show-overflow-tooltip >
        <template slot-scope="scope">{{ scope.row.storeName}}</template>
      </el-table-column>
      <el-table-column label="备注1" show-overflow-tooltip >
        <template slot-scope="scope">{{ scope.row.remark1}}</template>
      </el-table-column>
      <el-table-column label="备注2" show-overflow-tooltip >
        <template slot-scope="scope">{{ scope.row.remark2}}</template>
      </el-table-column>
      <el-table-column label="备注3" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.remark3}}</template>
      </el-table-column>
    </el-table>
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
  import {fetchList, getTamplate, do_import} from '@/api/importData'
  import XLSX from 'xlsx'
  import {getToken} from '@/utils/auth'
  import {formatDate} from '@/utils/date';

  export default {
    name: 'importDataList',
    data() {
      return {
        uploadExcel: '',
        excelParam: {
          onBankId: '',
          //excle key value 数据用于转map
          excelData: '',
          //excel key数据用于转list
          excelArr: ''
        },
        fileList: [],
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
        multipleSelection: [],
        fileName: '导入模板',
      }
    },
    computed: {
      // upload组件token获取不到,用这个方法解决
      headers() {
        return {
          'token': getToken(),
        }
      }
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 文件上传成功的钩子函数
      handleSuccess(res, file, index) {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '域配置成功',
            duration: 6000
          })
          this.fileList = this.fileList.slice(-1)
        } else {
          if (res.msg !== '') {
            this.$message({
              type: 'info',
              message: res.msg,
              duration: 6000
            })
          } else {
            this.$message({
              type: 'info',
              message: '域配置失败',
              duration: 6000
            })
          }
        }
      },
      // // 文件上传前的前的钩子函数

// // 参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
      handelBeforeUpload(file) {
        let _this = this;
// 使返回的值变成Promise对象，如果校验不通过，则reject，校验通过，则resolve
        return new Promise(function (resolve, reject) {
// readExcel方法也使用了Promise异步转同步，此处使用then对返回值进行处理
          _this.readExcel(file).then(result => {
            const isLt2M = file.size / 1024 / 1024 < 0.5
            if (!isLt2M) {
              _this.$message.error('文件大小不能超过500kb!')
            }
            if (isLt2M && result) {
              resolve('校验成功!');
              _this.do_import();
            }
          }, error => {
            _this.$message.error(error)
          })
        })
      },
      // 解析excel文件
      do_import() {
        do_import(this.excelParam);
      },
      readExcel(file) {
        let _this = this
// 初始化参数
        _this.excelParam.excelArr = []
        _this.excelParam.excelData = ''
        return new Promise(function (resolve, reject) {
          const reader = new FileReader()
          reader.onload = (e) => {
            var workbook
            try {
// 以二进制流方式读取得到整份excel表格对象
              var data = e.target.result
              workbook = XLSX.read(data, {type: 'binary'})
            } catch (e) {
              reject(e.message)
            }
            let excelJson = {}
// 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = '';
// 遍历每张表读取
            for (var sheet in workbook.Sheets) {
              let sheetInfos = workbook.Sheets[sheet];
              let locations = [];
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = sheetInfos['!ref'];
                console.log("sheetInfos---------------------" + JSON.stringify(sheetInfos));
                locations = _this.getLocationsKeys(fromTo)
              }
              console.log('locations------------' + locations);
              for (let i = 0; i < locations.length; i++) {
                let value = '';
                try {
                  value = sheetInfos[locations[i]].v
                } catch (e) {
                }
                excelJson[locations[i]] = value
                console.log('value--------------' + value);
                if (value !== i) {
// 校验失败reject
// reject(locations[i] + '\'s parameter isn\'t ' + i)
                }
              }
// 校验成功resolve
              resolve(true)
            }
// excel数据转json字符串传入后台,后转map集合
            _this.excelParam.excelData = JSON.stringify(excelJson);
            _this.excelParam.excelArr = JSON.stringify(_this.excelParam.excelArr);
            console.log('excelJson----------------------' + JSON.stringify(excelJson))
          }
          reader.readAsBinaryString(file)
        })
      },
      // A1:B5输出 A1,B1...，如果超过26个就会出现，A1:AA1情况，以此类推，也可能出现BA1（BZ1）
      getLocationsKeys(range) {
        let rangeArr = range.split(':');
// let startString = rangeArr[0]
        let endString = rangeArr[1];
        var reg = /[A-Z]{1,}/g;
        let end = endString.match(reg)[0];
        let endMath = endString.split(endString.match(reg)[0])[1];
        let total = 0;// 共有多少个
        for (let index = 0; index < end.length; index++) {
          total += Math.pow(26, end.length - index - 1) * (end.charCodeAt(index) - 64);
        }
        let result = [];
        for (let j = 1; j <= endMath; j++) {
          let excelKey = [];
          for (let i = 0; i < total; i++) {
            result.push(this.getCharByNum(i) + j);
            excelKey[i] = this.getCharByNum(i) + j;
            console.log(j - 1 + ',' + i + ',' + this.getCharByNum(i) + j);
          }
// 存excel key值到数组中,用于后台更好处理数据
          if (excelKey !== []) {
            this.excelParam.excelArr[j - 1] = JSON.stringify(excelKey);
          }
        }
        console.log('list:' + this.excelParam.excelArr);
        return result;
      },
      handelOnError() {
        // this.$message.error('解析excel文件失败');
      },
      getCharByNum(index) {
        let a = parseInt(index / 26);
        let b = index % 26;
        let returnChar = String.fromCharCode(b + 65);
        while (a > 0) {
          b = a % 26;
          a = parseInt(a / 26);
// 从后生成字符，向前推进
          returnChar = String.fromCharCode(b + 65 - 1) + returnChar;
        }
        return returnChar
      },
      getTamplate() {
        getTamplate().then((response) => {
          const link = document.createElement('a')
          let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'});
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob);
          link.setAttribute('download', this.fileName + '.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          console.log(response.data);
          this.listLoading = false;
          this.tableData = response.data;
          this.total = response.data.total;
          this.totalPage = response.data.totalPage;
          this.pageSize = response.data.pageSize;
        });
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
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
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


