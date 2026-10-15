export const site = {
  name: "adog.space",
  mark: "adog.space",
  role: "独立开发者",
  email: "lnmput@gmail.com",
  description: "我是 adog，一个独立创造互联网产品的人。持续探索 AI、互联网产品和那些值得亲手实现的想法。",
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
  imageLabel?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "AI Chat Backup",
    tagline: "Your AI conversations. Your knowledge.",
    description: "让 AI 对话成为真正属于自己的知识。",
    tags: ["Chrome Extension", "10+ AI Platforms", "Markdown / Notion / Obsidian"],
    link: "https://chatgpt-to-notion.linkcanvas.space/",
    linkLabel: "Explore Project",
    highlight: "10K Installs Milestone",
    image: "/images/ai-chat-backup-concept.png",
    imageAlt: "AI Chat Backup 功能概念插画：将多个 AI 平台的对话归档到 Markdown、Notion 或 Obsidian；并非产品截图",
    imageLabel: "Featured Project · Concept art, not a product screenshot",
  },
  {
    number: "02",
    title: "BookmarkCat",
    tagline: "A calmer way to organize the web.",
    description: "重新思考如何收藏、整理和找回互联网上的信息。",
    tags: ["侧边栏整理", "标签与备注", "快速找回"],
    link: "https://chromewebstore.google.com/detail/bookmarkcat-sidebar-bookm/afglhbhdpnicmeklejjhgmfoagllfkgj",
    linkLabel: "Chrome Web Store",
    image: "/images/bookmarkcat-concept.png",
    imageAlt: "BookmarkCat 功能概念插画：侧栏书签、标签、备注、搜索和个人云备份；并非产品截图",
    imageLabel: "Concept artwork · Not a product screenshot",
  },
  {
    number: "03",
    title: "X / Twitter Backup",
    tagline: "Keep what matters.",
    description: "保存那些值得留下的内容。",
    tags: ["内容归档", "Markdown / Notion"],
    link: "https://chromewebstore.google.com/detail/xtwitter-tweet-backup-mar/ghodkmngolbpaomhklnlgjilmcpikabm",
    linkLabel: "Chrome Web Store",
    image: "/images/x-twitter-backup-concept.png",
    imageAlt: "X/Twitter Backup 功能概念插画：将单条推文、来源链接和媒体整理到 Markdown 或 Notion；并非产品截图",
    imageLabel: "Concept artwork · Not a product screenshot",
  },
];

export const explorations = [
  { title: "AI-Native Products", description: "探索围绕 AI 能力设计的新产品。" },
  { title: "Independent Software", description: "构建小而有用、可以独立发布和持续维护的软件。" },
  { title: "Creative Experiments", description: "尝试生成式视觉、交互设计和新的数字表达方式。" },
  { title: "Automation & Workflows", description: "探索 AI 与软件自动化如何改变个人工作方式。" },
];
