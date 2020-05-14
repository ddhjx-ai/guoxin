import axios from 'axios'
import Qs from 'qs'
import request from '@/plugins/request';

// const baseURL = 'http://192.168.0.115:9000'
export function Login(data) {
  return request({
    url: "/login/",
    method: "post",
    data: Qs.stringify(data)
  });
  // return axios.create().post(baseURL+"/login/",Qs.stringify(data))
}

export function AccountRegister(data) {
  return request({
    url: "/api/register",
    method: "post",
    data,
  });
}

// 获取当前用户菜单接口
export function getMenuNav(data) {
  return request({
    url: "/menu/nav/",
    method: "get",
    data,
  });
}
