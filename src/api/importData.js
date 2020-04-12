import request from '@/utils/request'
import axios from '@/utils/axios'
import Qs from 'qs'
export function fetchList(params) {
  return request({
    url:'/importData/listAll',
    method:'get',
    params:params
  })
}

export function getTamplate() {
  return axios({
    url:'/importData/getTamplate',
    method:'post',
    responseType:'blob'
  })
}
export function do_import(data) {
  return request({
    url:'/importData/do_import',
    method:'post',
    data:Qs.stringify(data),
  })
}
export function doDeleteByIds(params) {
  return request({
    url:'/importData/doDeleteByIds',
    method:'get',
    params:params,
  })
}
export function updateImportData(id,data) {
  return request({
    url:'/importData/updateImportData/'+id,
    method:'post',
    data:data,
  })
}

export function getImportData(id) {
  return request({
    url:'/importData/getImportData/'+id,
    method:'get',
  })
}
export function createImportData(data) {
  return request({
    url:'/importData/createImportData',
    method:'post',
    data:data,
  })
}
