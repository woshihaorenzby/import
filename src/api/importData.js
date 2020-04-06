import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/importData/listAll',
    method:'get',
    params:params
  })
}

export function getTamplate() {
  return request({
    url:'/importData/getTamplate',
    method:'get',
  })
}
