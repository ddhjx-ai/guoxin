import BasicLayout from "@/layouts/basic-layout";

const meta = {
  auth: true,
};

const pre = "dashboard-";

export default {
  path: "/dashboard",
  name: "dashboard",
  redirect: {
    name: `${pre}console`,
  },
  meta,
  component: BasicLayout,
  children: [
    {
      path: "console",
      name: `${pre}console`,
      meta: {
        ...meta,
        title: "数据列表",
        closable: false,
      },
      component: () => import("@/pages/dashboard/console"),
    },
    {
      path: "subList",
      name: `${pre}subList`,
      meta: {
        ...meta,
        title: "子级列表",
        closable: true,
      },
      component: () => import("@/pages/dashboard/subList"),
    }
  ],
};
