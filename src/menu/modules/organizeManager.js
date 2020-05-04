const pre = "/organizeManager/";

export default {
  path: "/organizeManager",
  title: "权限管理",
  header: "home",
  icon: "md-options",
  children: [
    {
      path: `${pre}organization`,
      title: "组织管理",
    },
    {
      path: `${pre}roleManager`,
      title: "角色管理",
    },
    {
      path: `${pre}postManager`,
      title: "岗位管理",
    }
  ],
};