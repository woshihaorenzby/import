<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-button
          style="float: right"
          @click="getList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.wangwangId" placeholder="旺旺号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.info1" placeholder="A信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.info2" placeholder="B信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.storeName" placeholder="店铺"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.remark1" placeholder="备注1"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.remark2" placeholder="备注2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.remark3" placeholder="备注3"></el-input>
          </el-form-item>
          <el-date-picker
            v-model="pickerDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            size = "small" >
          </el-date-picker>
        </el-form>

      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <el-button type="primary" @click="doDeleteByIds" style="float: left;text-align: center" size="mini">删除</el-button>
      <!--      <el-button-->
      <!--        class="btn-add"-->
      <!--        @click="addBrand()"-->
      <!--        size="mini">-->
      <!--        添加-->
      <!--      </el-button>-->
      <el-row>
        <el-popover
          placement="bottom"
          width="80"
          trigger="click"
          @hide="columnHide"
          @show="columnShow"
          style="float: right;text-align: center">
          <div style="margin-top: 10px;">
            <el-checkbox-group v-model="column2show" size="mini" >
              <el-checkbox  v-for="cl in column2All" :key="cl.text"  :label="cl" style=" margin-left: 0px;" :checked="cl.checked" border>{{cl.text}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-button slot="reference" size="mini">列表选项</el-button>

        </el-popover>
      <el-button type="primary" @click="exportData" style="float: right;text-align: center" size="mini">
        导出数据
      </el-button>
      <el-button type="primary" @click="dialogFormVisible = true" style="float: right;text-align: center" size="mini">
        上传数据
      </el-button>
      <el-button type="primary" @click="addImportData()" style="float: right;text-align: center" size="mini">
        添加
      </el-button>

      </el-row>
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
          <el-button type="primary"  size="small">导入excle</el-button>
        </el-upload>
      </el-dialog>
    </el-card>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      show-summary
      :summary-method="getSummaries"
      @sort-change="changeTableSort"
      style="width: 100%"
      v-loading="listLoading"
      height="610"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
<!--      <el-table-column label="id"  hidden="true" sortable prop ="id">-->
      <el-table-column v-for="cl in column2show" :label="cl.text" :key="cl.lab" sortable v-if="cl.lab!=='addTime'&&cl.lab!=='id'" :prop="cl.lab"></el-table-column>
<!--      <el-table-column label="编号" width="100"  sortable prop ="id">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="日期"  width="120">-->
<!--        <template slot-scope="scope">{{ scope.row.addTime|formatCreateTime}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="旺旺号"  width="120" >-->
<!--        <template slot-scope="scope">{{ scope.row.wangwangId}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="佣金" sortable show-overflow-tooltip prop="commission">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="A金额" sortable show-overflow-tooltip prop="aPrice">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="A信息" show-overflow-tooltip>-->
<!--        <template slot-scope="scope">{{ scope.row.aInfo}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="B金额" sortable show-overflow-tooltip prop="bPrice">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="B信息" show-overflow-tooltip>-->
<!--        <template slot-scope="scope">{{ scope.row.bInfo}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="店铺" show-overflow-tooltip >-->
<!--        <template slot-scope="scope">{{ scope.row.storeName}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="备注1" show-overflow-tooltip >-->
<!--        <template slot-scope="scope">{{ scope.row.remark1}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="备注2" show-overflow-tooltip prop="remark2">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="备注3" show-overflow-tooltip>-->
<!--        <template slot-scope="scope">{{ scope.row.remark3}}</template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" width='100' align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
          @click="handleUpdate(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[20,50,100]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList, getTamplate, do_import,doDeleteByIds,exportData} from '@/api/importData'
  import XLSX from 'xlsx'
  import {getToken} from '@/utils/auth'
  import {formatDate} from '@/utils/date';
  import Cookies from 'js-cookie';

  export default {
    name: 'importDataList',
    data() {
      return {
        hasCheck : {},
      column2show:Cookies.get('column2show')==null||Cookies.get('column2show')==undefined?this.column2All:JSON.parse(Cookies.get('column2show')),
        column2All:[
          {"text":"年月日","lab":'addTime',"checked":false},
          {"text":"编号","lab":'code',"checked":false},
          {"text":"A信息","lab":'aInfo',"checked":false},
          {"text":"旺旺号","lab":'wangwangId',"checked":false},
          {"text":"A金额","lab":'aPrice',"checked":false},
          {"text":"B金额","lab":'bPrice',"checked":false},
          {"text":"C佣金","lab":'commission',"checked":false},
          {"text":"B信息","lab":'bInfo',"checked":false},
          {"text":" 备注1","lab":'remark1',"checked":false},
          {"text":" 备注2","lab":'remark2',"checked":false},
          {"text":" 备注3","lab":'remark3',"checked":false},

        ],
        pickerDate:"",
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
          startDate:null,
          endDate:null,
          ids:null,
          fieldName :null,
      sortingType:null,
          pageNum: 1,
          pageSize: 50
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start,end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
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
      columnHide(){
        Cookies.remove('column2show');
        Cookies.set('column2show', JSON.stringify(this.column2show), { expires: 7, path: '' });

      },
      columnShow(){
       if( Cookies.get('column2show')!==null&&Cookies.get('column2show')!==undefined){
         let v = JSON.parse(Cookies.get('column2show'));
         for(let i = 0;i<v.length;i++){
           this.hasCheck.set(v.text,true);
         }
         console.log(this.hasCheck);
       }else{

       }
      },
      exportData(){
        this.listLoading = true;
        if(this.pickerDate!=null&&this.pickerDate!=undefined&&this.pickerDate.length>0){
          this.listQuery.startDate=this.pickerDate[0];
          this.listQuery.endDate = this.pickerDate[1];
        }
        this.listQuery.ids=this.getIds();
        exportData(this.listQuery).then((response) => {
          this.listLoading = false;
          const link = document.createElement('a')
          let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'});
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob);
          link.setAttribute('download', '导出数据.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      },
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
                locations = _this.getLocationsKeys(fromTo)
              }
              for (let i = 0; i < locations.length; i++) {
                let value = '';
                try {
                  value = sheetInfos[locations[i]].v
                } catch (e) {
                }
                excelJson[locations[i]] = value
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
        let column2show = this.column2show;
        console.log(column2show);
        this.listLoading = true;
        if(this.pickerDate!=null&&this.pickerDate!=undefined&&this.pickerDate.length>0){
          this.listQuery.startDate=this.pickerDate[0];
          this.listQuery.endDate = this.pickerDate[1];
        }
        this.listQuery.ids=this.getIds();
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.tableData = response.data.list;
          this.total = response.data.total;
          this.totalPage = response.data.totalPage;
          this.pageSize = response.data.pageSize;
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      doDeleteByIds(){
        let ids = this.getIds();
        if(ids!=null&&ids!=''){
          this.$confirm('是否要删除该数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            doDeleteByIds({"ids":ids}).then(response =>{
              if(response.code==200){
                this.$message.success(response.message);
              }else{
                this.$message.error(response.message);
              }
              this.multipleSelection = null;
              this.getList();
            });
          });
        }else{
          this.$message.error("请选择后再进行删除操作");
        }
      },
      getIds(){
        let ids = '';
        if(this.multipleSelection!=null&&this.multipleSelection.length>0){
          for (var i = 0;i<this.multipleSelection.length;i++){
            ids+=this.multipleSelection[i].id+',';
          }
        }
        return ids;
      },
      handleUpdate(index,row){
        this.$router.push({path: '/importData/updateImportData', query: {id: row.id}})
      },
      addImportData(){
        this.$router.push({path: '/importData/createImportData'});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doDeleteByIds({'ids':row.id}).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }else if(index===1){
            sums[index] = '-';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev+curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2)+' 元';
          } else {
            sums[index] = '-';
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
      changeTableSort(column){
        //获取字段名称和排序类型
        this.listQuery.fieldName = column.prop;
        this.listQuery.sortingType = column.order==='descending'?'desc':"asc";
        this.getList();
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
  .el-checkbox{
    display:block;
    height:20px;
    line-height:20px;
    padding:0 5px;
    margin-right:0;
    font-size:12px;
    border: 1px solid transparent;
  }

  .el-popover{
    width: 130px;
    position: absolute;
    top: 287px;
    left: 90px;
    transform-origin: center top;
    z-index: 2001;
  }
</style>


