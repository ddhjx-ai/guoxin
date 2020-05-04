import BasicLayout from "@/layouts/basic-layout";

const meta = {
  auth: true,
};

const pre = "personManager-";

export default {
  path: "/personManager",
  name: "personManager",
  redirect: {
    name: `${pre}personal`,
  },
  meta,
  component: BasicLayout,
  children: [
    {
      path: "userManager",
      name: `${pre}userManager`,
      meta: {
        ...meta,
        title: "用户管理",
        closable: true,
      },
      component: () => import("@/pages/personManager/userManager"),
    },
    {
      path: "personal",
      name: `${pre}personal`,
      meta: {
        ...meta,
        title: "个人中心",
        closable: true,
      },
      component: () => import("@/pages/personManager/personal"),
    }
    
  ],
};
