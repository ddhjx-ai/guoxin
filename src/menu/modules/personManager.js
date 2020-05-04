const pre = "/personManager/";

export default {
  path: "/personManager",
  title: "人员管理",
  header: "home",
  icon: "md-person",
  children: [
    {
      path: `${pre}userManager`,
      title: "用户管理",
    },
    {
      path: `${pre}personal`,
      title: "个人中心",
    }
    
  ],
};
