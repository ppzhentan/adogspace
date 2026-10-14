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
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "AI Chat Backup",
    tagline: "Keep your AI conversations. Own your knowledge.",
    description: "将 AI 对话导出为 Markdown，或归档到 Notion 与 Obsidian，覆盖 10 个 AI 平台。",
    tags: ["Chrome Extension", "10+ AI Platforms", "Markdown / Notion / Obsidian"],
    link: "https://chatgpt-to-notion.linkcanvas.space/",
    linkLabel: "Explore Project",
    highlight: "10K Installs Milestone",
    image: "https://chatgpt-to-notion.linkcanvas.space/assets/ai-chat-backup-chatgpt-to-notion.png",
    imageAlt: "AI Chat Backup 将 ChatGPT 对话导出到 Notion 的真实产品截图",
  },
  {
    number: "02",
    title: "BookmarkCat",
    tagline: "A better home for your bookmarks.",
    description: "用侧边栏、标签、备注和搜索，让收藏过的信息更容易找回来。",
    tags: ["Chrome Extension", "Productivity", "Browser Tools"],
    link: "https://chromewebstore.google.com/detail/bookmarkcat-sidebar-bookm/afglhbhdpnicmeklejjhgmfoagllfkgj",
    linkLabel: "Chrome Web Store",
  },
  {
    number: "03",
    title: "X / Twitter Backup",
    tagline: "Save what matters before it disappears.",
    description: "将社交平台上的有价值内容保存、整理，并成为可迁移的个人资料。",
    tags: ["Browser Extension", "Content Archiving"],
    link: "https://chromewebstore.google.com/detail/xtwitter-tweet-backup-mar/ghodkmngolbpaomhklnlgjilmcpikabm",
    linkLabel: "Chrome Web Store",
  },
  {
    number: "04",
    title: "E-commerce & Web Systems",
    tagline: "Where code meets real business.",
    description: "参与日本和韩国市场的跨境电商项目，涉及网站开发、支付集成、本地化与订单履约。",
    tags: ["Web Development", "Integrations", "E-commerce"],
  },
];

export const capabilities = [
  { title: "Web Development", description: "使用 PHP、Laravel、JavaScript、MySQL 构建可靠的 Web 应用和后端服务。" },
  { title: "Browser Extensions", description: "围绕真实的浏览器使用场景，设计、开发并维护 Chrome 扩展。" },
  { title: "Product Building", description: "从问题发现、产品设计、开发上线，到用户反馈和持续迭代。" },
  { title: "AI & Automation", description: "探索 AI 辅助编程、内容生成、系统集成与自动化工作流。" },
];
