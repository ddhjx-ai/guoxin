import request from "@/plugins/request";

// 获取用户列表
export function getUserList(data = {}) {
  return request({
    url: "/user/list",
    method: "post",
    data,
  });
}

// 删除用户接口
export function userDelete(data = {}) {
  return request({
    url: "/user/delete",
    method: "post",
    data,
  });
}

// 新增用户接口
export function userSave(data = {}) {
  return request({
    url: "/user/save",
    method: "post",
    data,
  });
}

// 修改用户接口
export function userUpdate(data = {}) {
  return request({
    url: "/user/update",
    method: "post",
    data,
  });
}

// 用户分配角色接口
export function userAddRole(data = {}) {
  return request({
    url: "/user/addRole",
    method: "post",
    data,
  });
}

// 获取菜单列表接口
export function getMenuList(data = {}) {
  return request({
    url: "/menu/list",
    method: "post",
    data,
  });
}

// 删除菜单
export function menuDelete(data = {}) {
  return request({
    url: "/menu/delete",
    method: "post",
    data,
  });
}

// 获取上级菜单列表
export function getMenuSupList(data = {}) {
  return request({
    url: "/menu/supList",
    method: "post",
    data,
  });
}

// 新增菜单接口
export function menuSave(data = {}) {
  return request({
    url: "/menu/save",
    method: "post",
    data,
  });
}

// 修改菜单
export function menuUpdate(data = {}) {
  return request({
    url: "/menu/update",
    method: "post",
    data,
  });
}

// 获取角色列表接口
export function getRoleList(data = {}) {
  return request({
    url: "/role/list",
    method: "post",
    data,
  });
}

// 删除角色
export function roleDelete(data = {}) {
  return request({
    url: "/role/delete",
    method: "post",
    data,
  });
}

// 新增角色
export function roleSave(data = {}) {
  return request({
    url: "/role/save",
    method: "post",
    data,
  });
}

// 修改角色
export function roleUpdate(data = {}) {
  return request({
    url: "/role/update",
    method: "post",
    data,
  });
}

// 根据角色获取菜单列表
export function roleMenuList(data = {}) {
  return request({
    url: "/role/menuList",
    method: "post",
    data,
  });
}

// 角色分配菜单
export function roleAddMenu(data = {}) {
  return request({
    url: "/role/addMenu",
    method: "post",
    data,
  });
}