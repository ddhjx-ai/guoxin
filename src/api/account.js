import request from "@/plugins/request";

export function AccountLogin(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
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
    url: "/menu/nav",
    method: "get",
    data,
  });
}
