import BasicLayout from "@/layouts/basic-layout";

const meta = {
  auth: true,
};

const pre = "powerManager-";

export default {
  path: "/powerManager",
  name: "powerManager",
  redirect: {
    name: `${pre}userManager`,
  },
  meta,
  component: BasicLayout,
  children: [
    {
      path: "userManager",
      name: `${pre}userManager`,
      meta: {
        ...meta,
        title: "用户列表",
        closable: true,
      },
      component: () => import("@/pages/powerManager/userManager"),
    },
    {
      path: "roleManager",
      name: `${pre}roleManager`,
      meta: {
        ...meta,
        title: "角色列表",
        closable: true,
      },
      component: () => import("@/pages/powerManager/roleManager"),
    },
    {
      path: "powerSet",
      name: `${pre}powerSet`,
      meta: {
        ...meta,
        title: "菜单设置",
        closable: true,
      },
      component: () => import("@/pages/powerManager/powerSet"),
    },
    {
      path: "menuList",
      name: `${pre}menuList`,
      meta: {
        ...meta,
        title: "菜单列表",
        closable: true,
      },
      component: () => import("@/pages/powerManager/menuList"),
    }
  ],
};
