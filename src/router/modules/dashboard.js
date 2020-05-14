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
    },
    {
      path: "blackList",
      name: `${pre}blackList`,
      meta: {
        ...meta,
        title: "BlackList",
        closable: true,
      },
      component: () => import("@/pages/dashboard/blackList"),
    },
    {
      path: "block",
      name: `${pre}block`,
      meta: {
        ...meta,
        title: "Block",
        closable: true,
      },
      component: () => import("@/pages/dashboard/block"),
    },
    {
      path: "cebAttachment",
      name: `${pre}cebAttachment`,
      meta: {
        ...meta,
        title: "CebAttachment",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebAttachment"),
    },
    {
      path: "cebBidder",
      name: `${pre}cebBidder`,
      meta: {
        ...meta,
        title: "cebBidder",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebBidder"),
    },
    {
      path: "cebNotice",
      name: `${pre}cebNotice`,
      meta: {
        ...meta,
        title: "cebNotice",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebNotice"),
    },
    {
      path: "cebNoticeItem",
      name: `${pre}cebNoticeItem`,
      meta: {
        ...meta,
        title: "cebNoticeItem",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebNoticeItem"),
    },
    {
      path: "cebProject",
      name: `${pre}cebProject`,
      meta: {
        ...meta,
        title: "cebProject",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebProject"),
    },
    {
      path: "cebTenderBulletinPublicity",
      name: `${pre}cebTenderBulletinPublicity`,
      meta: {
        ...meta,
        title: "cebTenderBulletinPublicity",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebTenderBulletinPublicity"),
    },
    {
      path: "cebTenderProject",
      name: `${pre}cebTenderProject`,
      meta: {
        ...meta,
        title: "cebTenderProject",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebTenderProject"),
    },
    {
      path: "cebTenderQualify",
      name: `${pre}cebTenderQualify`,
      meta: {
        ...meta,
        title: "cebTenderQualify",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebTenderQualify"),
    },
    {
      path: "cebWinCandidatePublicity",
      name: `${pre}cebWinCandidatePublicity`,
      meta: {
        ...meta,
        title: "cebWinCandidatePublicity",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebWinCandidatePublicity"),
    },
    {
      path: "cebWinResultPublicity",
      name: `${pre}cebWinResultPublicity`,
      meta: {
        ...meta,
        title: "cebWinResultPublicity",
        closable: true,
      },
      component: () => import("@/pages/dashboard/cebWinResultPublicity"),
    },
    {
      path: "channel",
      name: `${pre}channel`,
      meta: {
        ...meta,
        title: "channel",
        closable: true,
      },
      component: () => import("@/pages/dashboard/channel"),
    },
    {
      path: "dcIndustryType",
      name: `${pre}dcIndustryType`,
      meta: {
        ...meta,
        title: "dcIndustryType",
        closable: true,
      },
      component: () => import("@/pages/dashboard/dcIndustryType"),
    },
    {
      path: "faBuJiHua",
      name: `${pre}faBuJiHua`,
      meta: {
        ...meta,
        title: "faBuJiHua",
        closable: true,
      },
      component: () => import("@/pages/dashboard/faBuJiHua"),
    },
    {
      path: "guangGao",
      name: `${pre}guangGao`,
      meta: {
        ...meta,
        title: "guangGao",
        closable: true,
      },
      component: () => import("@/pages/dashboard/guangGao"),
    },
    {
      path: "guangGaoWei",
      name: `${pre}guangGaoWei`,
      meta: {
        ...meta,
        title: "guangGaoWei",
        closable: true,
      },
      component: () => import("@/pages/dashboard/guangGaoWei"),
    },
    {
      path: "info",
      name: `${pre}info`,
      meta: {
        ...meta,
        title: "info",
        closable: true,
      },
      component: () => import("@/pages/dashboard/info"),
    },
    {
      path: "infoCatalog",
      name: `${pre}infoCatalog`,
      meta: {
        ...meta,
        title: "infoCatalog",
        closable: true,
      },
      component: () => import("@/pages/dashboard/infoCatalog"),
    },
    {
      path: "logPV",
      name: `${pre}logPV`,
      meta: {
        ...meta,
        title: "logPV",
        closable: true,
      },
      component: () => import("@/pages/dashboard/logPV"),
    },
    {
      path: "logPVBak",
      name: `${pre}logPVBak`,
      meta: {
        ...meta,
        title: "logPVBak",
        closable: true,
      },
      component: () => import("@/pages/dashboard/logPVBak"),
    },
    {
      path: "memberInfo",
      name: `${pre}memberInfo`,
      meta: {
        ...meta,
        title: "memberInfo",
        closable: true,
      },
      component: () => import("@/pages/dashboard/memberInfo"),
    },
    {
      path: "orhItem",
      name: `${pre}orhItem`,
      meta: {
        ...meta,
        title: "orhItem",
        closable: true,
      },
      component: () => import("@/pages/dashboard/orhItem"),
    },
    {
      path: "orgUserItem",
      name: `${pre}orgUserItem`,
      meta: {
        ...meta,
        title: "orgUserItem",
        closable: true,
      },
      component: () => import("@/pages/dashboard/orgUserItem"),
    },
    {
      path: "orgUserItemAmount",
      name: `${pre}orgUserItemAmount`,
      meta: {
        ...meta,
        title: "orgUserItemAmount",
        closable: true,
      },
      component: () => import("@/pages/dashboard/orgUserItemAmount"),
    },
    {
      path: "page",
      name: `${pre}page`,
      meta: {
        ...meta,
        title: "page",
        closable: true,
      },
      component: () => import("@/pages/dashboard/page"),
    },
    {
      path: "publishInfo",
      name: `${pre}publishInfo`,
      meta: {
        ...meta,
        title: "publishInfo",
        closable: true,
      },
      component: () => import("@/pages/dashboard/publishInfo"),
    },
    {
      path: "publishText",
      name: `${pre}publishText`,
      meta: {
        ...meta,
        title: "publishText",
        closable: true,
      },
      component: () => import("@/pages/dashboard/publishText"),
    },
    {
      path: "PVMemberTJ",
      name: `${pre}PVMemberTJ`,
      meta: {
        ...meta,
        title: "PVMemberTJ",
        closable: true,
      },
      component: () => import("@/pages/dashboard/PVMemberTJ"),
    },
    {
      path: "regionV8",
      name: `${pre}regionV8`,
      meta: {
        ...meta,
        title: "regionV8",
        closable: true,
      },
      component: () => import("@/pages/dashboard/regionV8"),
    },
    {
      path: "senPublishInfo",
      name: `${pre}senPublishInfo`,
      meta: {
        ...meta,
        title: "senPublishInfo",
        closable: true,
      },
      component: () => import("@/pages/dashboard/senPublishInfo"),
    },
    {
      path: "site",
      name: `${pre}site`,
      meta: {
        ...meta,
        title: "site",
        closable: true,
      },
      component: () => import("@/pages/dashboard/site"),
    },
    {
      path: "siteV8",
      name: `${pre}siteV8`,
      meta: {
        ...meta,
        title: "siteV8",
        closable: true,
      },
      component: () => import("@/pages/dashboard/siteV8"),
    },
    {
      path: "spiderInfoV8",
      name: `${pre}spiderInfoV8`,
      meta: {
        ...meta,
        title: "spiderInfoV8",
        closable: true,
      },
      component: () => import("@/pages/dashboard/spiderInfoV8"),
    },
    {
      path: "spiderInfoV8Rate",
      name: `${pre}spiderInfoV8Rate`,
      meta: {
        ...meta,
        title: "spiderInfoV8Rate",
        closable: true,
      },
      component: () => import("@/pages/dashboard/spiderInfoV8Rate"),
    },
    {
      path: "spiderMonthPv",
      name: `${pre}spiderMonthPv`,
      meta: {
        ...meta,
        title: "spiderMonthPv",
        closable: true,
      },
      component: () => import("@/pages/dashboard/spiderMonthPv"),
    },
    {
      path: "TBIWinBidBulletin",
      name: `${pre}TBIWinBidBulletin`,
      meta: {
        ...meta,
        title: "TBIWinBidBulletin",
        closable: true,
      },
      component: () => import("@/pages/dashboard/TBIWinBidBulletin"),
    },
    {
      path: "TBIWinCandidateBulletin",
      name: `${pre}TBIWinCandidateBulletin`,
      meta: {
        ...meta,
        title: "TBIWinCandidateBulletin",
        closable: true,
      },
      component: () => import("@/pages/dashboard/TBIWinCandidateBulletin"),
    },
    {
      path: "TBIProject",
      name: `${pre}TBIProject`,
      meta: {
        ...meta,
        title: "TBIProject",
        closable: true,
      },
      component: () => import("@/pages/dashboard/TBIProject"),
    },
    {
      path: "TBITenderBulletin",
      name: `${pre}TBITenderBulletin`,
      meta: {
        ...meta,
        title: "TBITenderBulletin",
        closable: true,
      },
      component: () => import("@/pages/dashboard/TBITenderBulletin"),
    },
    {
      path: "TBITenderProject",
      name: `${pre}TBITenderProject`,
      meta: {
        ...meta,
        title: "TBITenderProject",
        closable: true,
      },
      component: () => import("@/pages/dashboard/TBITenderProject"),
    },
    {
      path: "tbUser",
      name: `${pre}tbUser`,
      meta: {
        ...meta,
        title: "tbUser",
        closable: true,
      },
      component: () => import("@/pages/dashboard/tbUser"),
    },
    {
      path: "tenderFile",
      name: `${pre}tenderFile`,
      meta: {
        ...meta,
        title: "tenderFile",
        closable: true,
      },
      component: () => import("@/pages/dashboard/tenderFile"),
    },
    {
      path: "TSAttachment",
      name: `${pre}TSAttachment`,
      meta: {
        ...meta,
        title: "TSAttachment",
        closable: true,
      },
      component: () => import("@/pages/dashboard/TSAttachment"),
    },
    {
      path: "winBidBulletinItem",
      name: `${pre}winBidBulletinItem`,
      meta: {
        ...meta,
        title: "winBidBulletinItem",
        closable: true,
      },
      component: () => import("@/pages/dashboard/winBidBulletinItem"),
    },
    {
      path: "winBidderItem",
      name: `${pre}winBidderItem`,
      meta: {
        ...meta,
        title: "winBidderItem",
        closable: true,
      },
      component: () => import("@/pages/dashboard/winBidderItem"),
    },
    {
      path: "WinCandidateItem",
      name: `${pre}WinCandidateItem`,
      meta: {
        ...meta,
        title: "WinCandidateItem",
        closable: true,
      },
      component: () => import("@/pages/dashboard/WinCandidateItem"),
    },
    {
      path: "YeZhu",
      name: `${pre}YeZhu`,
      meta: {
        ...meta,
        title: "YeZhu",
        closable: true,
      },
      component: () => import("@/pages/dashboard/YeZhu"),
    },
    {
      path: "YzAdList",
      name: `${pre}YzAdList`,
      meta: {
        ...meta,
        title: "YzAdList",
        closable: true,
      },
      component: () => import("@/pages/dashboard/YzAdList"),
    },
    {
      path: "ZBXX_V8_1",
      name: `${pre}ZBXX_V8_1`,
      meta: {
        ...meta,
        title: "ZBXX_V8_1",
        closable: true,
      },
      component: () => import("@/pages/dashboard/ZBXX_V8_1"),
    },
    {
      path: "ZBXX_V8_2",
      name: `${pre}ZBXX_V8_2`,
      meta: {
        ...meta,
        title: "ZBXX_V8_2",
        closable: true,
      },
      component: () => import("@/pages/dashboard/ZBXX_V8_2"),
    },
    {
      path: "ZhangDan",
      name: `${pre}ZhangDan`,
      meta: {
        ...meta,
        title: "ZhangDan",
        closable: true,
      },
      component: () => import("@/pages/dashboard/ZhangDan"),
    },
    {
      path: "ZhuanTi",
      name: `${pre}ZhuanTi`,
      meta: {
        ...meta,
        title: "ZhuanTi",
        closable: true,
      },
      component: () => import("@/pages/dashboard/ZhuanTi"),
    },
    {
      path: "CebBidSection",
      name: `${pre}CebBidSection`,
      meta: {
        ...meta,
        title: "CebBidSection",
        closable: true,
      },
      component: () => import("@/pages/dashboard/CebBidSection"),
    },
    {
      path: "CebChangedBulletin",
      name: `${pre}CebChangedBulletin`,
      meta: {
        ...meta,
        title: "CebChangedBulletin",
        closable: true,
      },
      component: () => import("@/pages/dashboard/CebChangedBulletin"),
    },
    {
      path: "CebEnergy",
      name: `${pre}CebEnergy`,
      meta: {
        ...meta,
        title: "CebEnergy",
        closable: true,
      },
      component: () => import("@/pages/dashboard/CebEnergy"),
    },
  ],
};
