import BasicLayout from "@/layouts/basic-layout";

const meta = {
  auth: true,
};

const pre = "organizeManager-";

export default {
  path: "/organizeManager",
  name: "organizeManager",
  redirect: {
    name: `${pre}organization`,
  },
  meta,
  component: BasicLayout,
  children: [
    {
      path: "organization",
      name: `${pre}organization`,
      meta: {
        ...meta,
        title: "组织管理",
        closable: true,
      },
      component: () => import("@/pages/organizeManager/organization"),
    },
    {
      path: "roleManager",
      name: `${pre}roleManager`,
      meta: {
        ...meta,
        title: "角色管理",
        closable: true,
      },
      component: () => import("@/pages/organizeManager/roleManager"),
    },
    {
      path: "postManager",
      name: `${pre}postManager`,
      meta: {
        ...meta,
        title: "岗位管理",
        closable: true,
      },
      component: () => import("@/pages/organizeManager/postManager"),
    }
  ],
};