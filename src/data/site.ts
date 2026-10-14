export const site = {
  name: "adog.space",
  mark: "adog.space",
  role: "独立开发者",
  email: "[邮箱待补充]",
  description: "独立开发者。写代码，做产品，解决真实的问题。",
};

export type Project = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "AI Chat Backup",
    tagline: "Keep your AI conversations. Own your knowledge.",
    description: "一款面向全球用户的 Chrome 扩展，帮助用户将 AI 对话保存为 Markdown，或归档到 Notion 和 Obsidian。从最初解决个人需求的小工具，逐渐发展成支持 10 个 AI 平台的产品。",
    tags: ["Chrome Extension", "10+ AI Platforms", "Markdown / Notion / Obsidian"],
    link: "https://chatgpt-to-notion.linkcanvas.space/",
    linkLabel: "Explore Project",
    highlight: "10K Installs Milestone",
  },
  {
    number: "02",
    title: "BookmarkCat",
    tagline: "A better home for your bookmarks.",
    description: "一个围绕浏览器侧边栏构建的书签管理工具。通过标签、备注、搜索和整理功能，让收藏过的信息更容易被重新找到。",
    tags: ["Chrome Extension", "Productivity", "Browser Tools"],
  },
  {
    number: "03",
    title: "X / Twitter Backup",
    tagline: "Save what matters before it disappears.",
    description: "尝试让社交平台上的有价值内容成为可以长期保存、整理和迁移的个人资料。",
    tags: ["Browser Extension", "Content Archiving"],
  },
  {
    number: "04",
    title: "E-commerce & Web Systems",
    tagline: "Where code meets real business.",
    description: "参与面向日本和韩国市场的跨境电商项目。从网站开发、支付集成、本地化，到订单履约、广告创意和用户转化，以更完整的商业视角理解软件。",
    tags: ["Web Development", "Integrations", "E-commerce"],
  },
];

export const capabilities = [
  { title: "Web Development", description: "使用 PHP、Laravel、JavaScript、MySQL 构建可靠的 Web 应用和后端服务。" },
  { title: "Browser Extensions", description: "围绕真实的浏览器使用场景，设计、开发并维护 Chrome 扩展。" },
  { title: "Product Building", description: "从问题发现、产品设计、开发上线，到用户反馈和持续迭代。" },
  { title: "AI & Automation", description: "探索 AI 辅助编程、内容生成、系统集成与自动化工作流。" },
];
