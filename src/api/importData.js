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
