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
    },
    {
      path: `${pre}roleManager`,
      title: '角色列表'
    },
    {
      path: `${pre}powerSet`,
      title: '菜单设置'
    },
    {
      path: `${pre}menuList`,
      title: '菜单列表'
    }
  ],
};
