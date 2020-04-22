import request from '@/utils/request'
import axios from '@/utils/axios'
import Qs from 'qs'
export function fetchList(data) {
  return request({
    url:'/importData1/listAll/'+data.pageNum+"/"+data.pageSize+'/'+data.fieldName+"/"+data.sortingType,
    method:'post',
    data:data
  })
}

export function getTamplate() {
  return axios({
    url:'/importData1/getTamplate',
    method:'post',
    responseType:'blob'
  })
}
export function exportData(data) {
  return axios({
    url:'/importData1/exportData',
    method:'post',
    data:data,
    responseType:'blob'
  })
}
export function do_import(data) {
  return request({
    url:'/importData1/do_import',
    method:'post',
    data:Qs.stringify(data),
  })
}
export function doDeleteByIds(params) {
  return request({
    url:'/importData1/doDeleteByIds',
    method:'get',
    params:params,
  })
}
export function doDeleteHis(params) {
  return request({
    url:'/importData1/listAll/doDeleteHis',
    method:'get',
    params:params,
  })
}
export function updateImportData(id,data) {
  return request({
    url:'/importData1/updateImportData/'+id,
    method:'post',
    data:data,
  })
}

export function getImportData(id) {
  return request({
    url:'/importData1/getImportData/'+id,
    method:'get',
  })
}
export function createImportData(data) {
  return request({
    url:'/importData1/createImportData',
    method:'post',
    data:data,
  })
}
