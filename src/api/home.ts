import request from '@/utils/request'

//使用封装好的request
export function getInfo(params:{id:string}) {
  return request<Res<Data<string>>>({
    url: '/user/info',
    method: 'get',
    params
  });
}

//返回所有的res信息
export function login(data:{username:string,password:string}) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}