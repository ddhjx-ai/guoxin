import data from '../data.json'

const pre = "/dashboard/";

console.log(data)
export default {
  path: "/dashboard",
  title: "数据管理",
  header: "home",
  icon: "md-shuffle",
  children: [
    // ...data
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
    {
      path: `${pre}cebBidder`,
      title: 'CebBidder'
    },
    {
      path: `${pre}CebBidSection`,
      title: 'CebBidSection'
    },
    {
      path: `${pre}CebChangedBulletin`,
      title: 'CebChangedBulletin'
    },
    {
      path: `${pre}CebEnergy`,
      title: 'CebEnergy'
    },
    {
      path: `${pre}cebNotice`,
      title: 'CebNotice'
    },
    {
      path: `${pre}cebNoticeItem`,
      title: 'CebNoticeItem'
    },
    {
      path: `${pre}cebProject`,
      title: 'CebProject'
    },
    {
      path: `${pre}cebTenderBulletinPublicity`,
      title: 'CebTenderBulletinPublicity'
    },
    {
      path: `${pre}cebTenderProject`,
      title: 'CebTenderProject'
    },
    {
      path: `${pre}cebTenderQualify`,
      title: 'CebTenderQualify'
    },
    {
      path: `${pre}cebWinCandidatePublicity`,
      title: 'CebWinCandidatePublicity'
    },
    {
      path: `${pre}cebWinResultPublicity`,
      title: 'CebWinResultPublicity'
    },
    {
      path: `${pre}channel`,
      title: 'Channel'
    },
    {
      path: `${pre}dcIndustryType`,
      title: 'DcIndustryType'
    },
    {
      path: `${pre}faBuJiHua`,
      title: 'FaBuJiHua'
    },
    {
      path: `${pre}guangGao`,
      title: 'GuangGao'
    },
    {
      path: `${pre}guangGaoWei`,
      title: 'GuangGaoWei'
    },
    {
      path: `${pre}info`,
      title: 'Info'
    },
    {
      path: `${pre}infoCatalog`,
      title: 'InfoCatalog'
    },
    {
      path: `${pre}logPV`,
      title: 'LogPV'
    },
    {
      path: `${pre}logPVBak`,
      title: 'LogPVBak'
    },
    {
      path: `${pre}memberInfo`,
      title: 'MemberInfo'
    },
    {
      path: `${pre}orhItem`,
      title: 'OrhItem'
    },
    {
      path: `${pre}orgUserItem`,
      title: 'OrgUserItem'
    },
    {
      path: `${pre}orgUserItemAmount`,
      title: 'OrgUserItemAmount'
    },
    {
      path: `${pre}page`,
      title: 'Page'
    },
    {
      path: `${pre}publishInfo`,
      title: 'PublishInfo'
    },
    {
      path: `${pre}publishText`,
      title: 'PublishText'
    },
    {
      path: `${pre}PVMemberTJ`,
      title: 'PVMemberTJ'
    },
    {
      path: `${pre}regionV8`,
      title: 'RegionV8'
    },
    {
      path: `${pre}senPublishInfo`,
      title: 'SenPublishInfo'
    },
    {
      path: `${pre}site`,
      title: 'Site'
    },
    {
      path: `${pre}siteV8`,
      title: 'SiteV8'
    },
    {
      path: `${pre}spiderInfoV8`,
      title: 'SpiderInfoV8'
    },
    {
      path: `${pre}spiderInfoV8Rate`,
      title: 'SpiderInfoV8Rate'
    },
    {
      path: `${pre}spiderMonthPv`,
      title: 'SpiderMonthPv'
    },
    {
      path: `${pre}TBIWinBidBulletin`,
      title: 'TBIWinBidBulletin'
    },
    {
      path: `${pre}TBIWinCandidateBulletin`,
      title: 'TBIWinCandidateBulletin'
    },
    {
      path: `${pre}TBIProject`,
      title: 'TBIProject'
    },
    {
      path: `${pre}TBITenderBulletin`,
      title: 'TBITenderBulletin'
    },
    {
      path: `${pre}TBITenderProject`,
      title: 'TBITenderProject'
    },
    {
      path: `${pre}tbUser`,
      title: 'TbUser'
    },
    {
      path: `${pre}tenderFile`,
      title: 'TenderFile'
    },
    {
      path: `${pre}TSAttachment`,
      title: 'TSAttachment'
    },
    {
      path: `${pre}winBidBulletinItem`,
      title: 'WinBidBulletinItem'
    },
    {
      path: `${pre}winBidderItem`,
      title: 'WinBidderItem'
    },
    {
      path: `${pre}WinCandidateItem`,
      title: 'WinCandidateItem'
    },
    {
      path: `${pre}YeZhu`,
      title: 'YeZhu'
    },
    {
      path: `${pre}YzAdList`,
      title: 'YzAdList'
    },
    {
      path: `${pre}ZBXX_V8_1`,
      title: 'ZBXX_V8_1'
    },
    {
      path: `${pre}ZBXX_V8_2`,
      title: 'ZBXX_V8_2'
    },
    {
      path: `${pre}ZhangDan`,
      title: 'ZhangDan'
    },
    {
      path: `${pre}ZhuanTi`,
      title: 'ZhuanTi'
    },
  ],
};
