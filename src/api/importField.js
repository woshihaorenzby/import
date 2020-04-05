import request from '@/utils/request'
export function fetchAllResourceList(roleId) {
  return request({
    url:'/importField/listAll/'+roleId,
    method:'get',
  })
}


