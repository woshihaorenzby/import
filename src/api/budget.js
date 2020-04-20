import request from '@/utils/request'
import axios from '@/utils/axios'
import Qs from 'qs'
export function fetchList(data) {
  return request({
    url:'/budget/listAll/'+data.pageNum+"/"+data.pageSize+'/'+data.fieldName+"/"+data.sortingType,
    method:'post',
    data:data
  })
}

export function getTamplate() {
  return axios({
    url:'/budget/getTamplate',
    method:'post',
    responseType:'blob'
  })
}
export function exportData(data) {
  return axios({
    url:'/budget/exportData',
    method:'post',
    data:data,
    responseType:'blob'
  })
}
export function do_import(data) {
  return request({
    url:'/budget/do_import',
    method:'post',
    data:Qs.stringify(data),
  })
}
export function doDeleteByIds(params) {
  return request({
    url:'/budget/doDeleteByIds',
    method:'get',
    params:params,
  })
}
export function doDeleteHis(params) {
  return request({
    url:'/budget/listAll/doDeleteHis',
    method:'get',
    params:params,
  })
}
export function updateImportData(id,data) {
  return request({
    url:'/budget/updateImportData/'+id,
    method:'post',
    data:data,
  })
}

export function getImportData(id) {
  return request({
    url:'/budget/getImportData/'+id,
    method:'get',
  })
}
export function createImportData(data) {
  return request({
    url:'/budget/createImportData',
    method:'post',
    data:data,
  })
}
