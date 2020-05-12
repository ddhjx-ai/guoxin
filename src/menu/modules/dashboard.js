const pre = "/dashboard/";

export default {
  path: "/dashboard",
  title: "数据管理",
  header: "home",
  icon: "md-shuffle",
  children: [
    {
      path: `${pre}console`,
      title: "数据列表",
    },
    {
      path: `${pre}subList`,
      title: '子级列表',
      auth: ['hidden']
    },
    {
      path: `${pre}blackList`,
      title: 'BlackList'
    },
    {
      path: `${pre}block`,
      title: 'Block'
    },
    {
      path: `${pre}cebAttachment`,
      title: 'CebAttachment'
    },
  ],
};
