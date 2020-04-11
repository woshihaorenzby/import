import XLSX from "xlsx";

// 文件上传成功的钩子函数
export function handleSuccess (res, file, index) {
  if (res.code === 0) {
    this.$message({
      type: 'success',
      message: '域配置成功',
      duration: 6000
    });
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
}
// // 文件上传前的前的钩子函数

// // 参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
export function  handelBeforeUpload (file) {
  let _this = this;
// 使返回的值变成Promise对象，如果校验不通过，则reject，校验通过，则resolve
  return new Promise(function(resolve, reject) {
// readExcel方法也使用了Promise异步转同步，此处使用then对返回值进行处理
    readExcel(file).then(result => {
      const isLt2M = file.size / 1024 / 1024 < 0.5
      if (!isLt2M) {
        _this.$message.error('文件大小不能超过500kb!')
      }
      if (isLt2M && result) {
        resolve('校验成功!')
      }
    }, error => {
      _this.$message.error(error)
    })
  })
}
// 解析excel文件
export function  readExcel(file) {
  let _this = this
// 初始化参数
  _this.excelParam.excelArr = []
  _this.excelParam.excelData = ''
  return new Promise(function(resolve, reject) {
    const reader = new FileReader()
    reader.onload = (e) => {
      var workbook;
      try {
// 以二进制流方式读取得到整份excel表格对象
        let data = e.target.result
        workbook = XLSX.read(data, {type: 'binary'})
      } catch (e) {
        reject(e.message)
      }
      let excelJson = {}
// 表格的表格范围，可用于判断表头是否数量是否正确
      let fromTo = ''
// 遍历每张表读取
      for (var sheet in workbook.Sheets) {
        let sheetInfos = workbook.Sheets[sheet]
        let locations = []
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          fromTo = sheetInfos['!ref']
          locations = getLocationsKeys(fromTo)
        }
        console.log(locations)
        for (let i = 0; i < locations.length; i++) {
          let value = ''
          try {
            value = sheetInfos[locations[i]].v
          } catch (e) {
          }
          excelJson[locations[i]] = value
          console.log(value)
          if (value !== i) {
// 校验失败reject
// reject(locations[i] + '\'s parameter isn\'t ' + i)
          }
        }
// 校验成功resolve
        resolve(true)
      }
// excel数据转json字符串传入后台,后转map集合
      _this.excelParam.excelData = JSON.stringify(excelJson)
      console.log(JSON.stringify(excelJson))
    }
    reader.readAsBinaryString(file)
  })
}
// A1:B5输出 A1,B1...，如果超过26个就会出现，A1:AA1情况，以此类推，也可能出现BA1（BZ1）
export function getLocationsKeys(range) {
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
}
export function handelOnError () {
  this.$message.error('解析excel文件失败');
}
export function getCharByNum(index) {
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
}
