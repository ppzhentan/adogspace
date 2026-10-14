export const site = {
  // The domain is known. It identifies the site, not the owner's personal name.
  name: "adog.space",
  mark: "adog.space",
  role: "个人主页与作品集",
  location: "",
  email: "[邮箱待补充]",
  description: "这里是我的个人主页，用来介绍自己、展示作品，并提供联系渠道。",
  about: "我正在整理个人资料与过往作品。职业方向、经历、所在地和合作方式还没有补充。",
};

export type Project = {
  title: string;
  type: string;
  year: string;
  description: string;
  detailsMissing: string;
};

export const projects: Project[] = [
  {
    title: "adog.space 太空首页",
    type: "互动网页",
    year: "时间未记录",
    description: "仓库中的旧版首页以地球、月球、火星和火箭构成太空场景，并包含行星漂浮与火箭轨迹动画。",
    detailsMissing: "旧版页面能确认其视觉与交互内容，但你的具体职责、项目时间和实际使用情况没有记录。",
  },
];
