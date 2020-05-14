const pre = "/powerManager/";

export default {
  path: "/powerManager",
  title: "权限管理",
  header: "home",
  icon: "md-options",
  children: [
    {
      path: `${pre}userManager`,
      title: "用户列表",
      auth: ['user']
    },
    {
      path: `${pre}roleManager`,
      title: '角色列表',
      auth: ['user']
    },
    {
      path: `${pre}powerSet`,
      title: '菜单设置',
      auth: ['user']
    },
    {
      path: `${pre}menuList`,
      title: '菜单列表',
      auth: ['user']
    }
  ],
};
