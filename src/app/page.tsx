import Image from "next/image";
import { capabilities, projects, site } from "@/data/site";

const otherDomains = [
  { name: "yangwandou.com", doodle: "pea" },
  { name: "1000000.money", doodle: "coin" },
  { name: "bujing.yun", doodle: "cloud" },
  { name: "goushi.yun", doodle: "cloud-face" },
  { name: "9du.beer", doodle: "beer" },
  { name: "bye.hair", doodle: "comb" },
];

function DomainDoodle({ kind }: { kind: string }) {
  return (
    <svg className={`domain-doodle domain-doodle-${kind}`} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {kind === "pea" && <>
        <path d="M5 21c2-8 8-13 17-14 4 0 6 2 5 6-2 8-8 13-17 14-4 0-6-2-5-6Z" />
        <circle cx="12" cy="20" r="2.2" /><circle cx="18" cy="16" r="2.2" /><circle cx="23" cy="12" r="2" />
        <path d="M5 22 3 25m22-18 3-3" />
      </>}
      {kind === "coin" && <>
        <path d="M16 4c6.5 0 11 4.7 11 11.5S22 27 15.5 27 5 22.3 5 15.5 9.5 4 16 4Z" />
        <path d="M19.5 11c-.8-1-2-1.5-3.5-1.5-2 0-3.5 1-3.5 2.7 0 4 7 1.7 7 5.8 0 1.7-1.5 3-3.8 3-1.7 0-3.2-.6-4.2-1.8M16 7.5v17" />
        <path d="m5 7-2-2m24 21-2-2" />
      </>}
      {kind === "cloud" && <>
        <path d="M9 23h13a5 5 0 0 0 .3-10 7 7 0 0 0-13.5-1.5A5.8 5.8 0 0 0 9 23Z" />
        <path d="m12 27-1 2m8-2-1 2" />
      </>}
      {kind === "cloud-face" && <>
        <path d="M9 22h13a5 5 0 0 0 .3-10 7 7 0 0 0-13.5-1.5A5.8 5.8 0 0 0 9 22Z" />
        <path d="M13 17h.1m6-.2h.1m-5.2 2.8c1.1 1 2.8 1.1 4 .1" />
        <path d="m7 26-1 2m18-2 1 2" />
      </>}
      {kind === "beer" && <>
        <path d="M8 8h15l-1.5 18h-12L8 8Z" />
        <path d="M8 12H5v7h4m14-7h2c2 0 2 2 2 3.5S27 19 25 19h-3" />
        <path d="M9 8c-.7-2 1.5-3 2.5-1.2C12 3.5 16 4 16 7c1.4-2.6 5.3-1.5 5 1" />
        <path d="M11 15v6m5-6v6" />
      </>}
      {kind === "comb" && <>
        <path d="M7 12c4-5 13-6 18-2l-1 4c-4 3-12 3-17 1l-1-3Z" />
        <path d="m9 16 1 7m4-6 1 7m4-7 1 6m4-9 1 4" />
        <path d="M5 8c2-3 4-4 7-5m8 1 2 2" />
      </>}
    </svg>
  );
}

function BrandBadge({ brand }: { brand: "chatgpt" | "notion" | "x" }) {
  const labels = { chatgpt: "ChatGPT", notion: "Notion", x: "X / Twitter" };
  return (
    <span className={`brand-badge brand-badge-${brand}`} aria-label={labels[brand]}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {brand === "notion" ? <>
          <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
          <path d="M8 17V7l8 10V7" />
        </> : brand === "x" ? <path d="M5 4h4.4l9.6 16h-4.4L5 4Zm0 16L18.8 4h-2.7L5 17.1V20Z" /> : <>
          <path d="M12 3.2c2.2 0 4.1 1.2 5.2 3.1l-2.1 1.2a3.6 3.6 0 0 0-6.2 0L6.8 6.3A6 6 0 0 1 12 3.2Z" />
          <path d="M18.1 6.4a6 6 0 0 1 2.7 4.7l-2.4.1a3.6 3.6 0 0 0-3.6-3.5V5.3c1.2 0 2.3.4 3.3 1.1Z" />
          <path d="M20.8 11.1a6 6 0 0 1-2.1 5l-1.5-1.8a3.6 3.6 0 0 0-.5-5.1l1.5-1.8a6 6 0 0 1 2.6 3.7Z" />
          <path d="M18.7 16.1a6 6 0 0 1-5.1 2.8v-2.4a3.6 3.6 0 0 0 3.1-1.8l2 1.4Z" />
          <path d="M13.6 18.9a6 6 0 0 1-5.3-3l2.1-1.2a3.6 3.6 0 0 0 3.2 1.8v2.4Z" />
          <path d="M8.3 15.9a6 6 0 0 1-2.7-4.8l2.4-.1a3.6 3.6 0 0 0 3.6 3.5v2.4c-1.2 0-2.3-.4-3.3-1Z" />
          <path d="M5.6 11.1a6 6 0 0 1 2.1-5l1.5 1.8a3.6 3.6 0 0 0 .5 5.1l-1.5 1.8a6 6 0 0 1-2.6-3.7Z" />
        </>}
      </svg>
      <span>{labels[brand]}</span>
    </span>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="adog.space 首页">adog.space</a>
        <nav aria-label="主导航">
          <a href="#work">作品</a>
          <a href="#about">关于</a>
          <a className="nav-contact" href="#contact">联系我 <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="main" className="page-shell">
        <nav className="domain-strip" aria-label="我的其他网站">
          {otherDomains.map(({ name, doodle }) => (
            <a key={name} href={`https://${name}`} target="_blank" rel="noreferrer">
              <DomainDoodle kind={doodle} />
              <span>{name}</span>
            </a>
          ))}
        </nav>
        <section className="intro" id="top" aria-labelledby="intro-title">
          <p className="eyebrow">独立开发者 · adog.space</p>
          <h1 id="intro-title">I build things<br />for the internet.</h1>
          <p className="intro-subtitle">写代码，做产品，解决真实的问题。</p>
          <p className="intro-copy">一名拥有约 8 年经验的独立开发者。从 Web 开发到 Chrome 扩展，持续探索 AI、互联网产品和那些值得亲手实现的想法。</p>
          <a className="text-link" href="#work">Explore my work <span aria-hidden="true">→</span></a>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">Selected Work</h2>
            <p>一些我真正动手做过的东西。</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project${project.number === "01" ? " project-featured" : ""}`} key={project.number}>
                {project.image && <>
                  <p className="project-feature-label">{project.imageLabel ?? (project.number === "01" ? "Featured Project" : "Concept artwork")} <span>{project.number} / 04</span></p>
                  <div className="project-image project-image-real">
                    <Image src={project.image} alt={project.imageAlt ?? `${project.title} 产品截图`} fill sizes="(max-width: 600px) calc(100vw - 40px), 720px" unoptimized />
                    {project.number === "01" && <>
                      <BrandBadge brand="chatgpt" />
                      <BrandBadge brand="notion" />
                    </>}
                    {project.number === "03" && <>
                      <BrandBadge brand="x" />
                      <BrandBadge brand="notion" />
                    </>}
                  </div>
                </>}
                <div className="project-heading">
                  <h3>{project.title}</h3>
                  {project.highlight && <span>{project.highlight}</span>}
                </div>
                <p className="project-meta">{project.tagline}</p>
                <p className="project-description">{project.description}</p>
                <ul className="project-tags" aria-label="技术与项目标签">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                {project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} ↗</a> : <span className="project-link-missing">项目链接待补充</span>}
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <h2 id="about-title">About Me</h2>
          <div className="about-card">
            <div className="about-card-heading">
              <span className="about-monogram" aria-hidden="true">a</span>
              <div><h3>Developer by experience. Builder by nature.</h3><p>{site.role}</p></div>
            </div>
            <p>我的职业经历始于 Web 开发。长期使用 PHP、Laravel、MySQL 和 JavaScript 构建网站、后端服务与业务系统，也熟悉服务器部署、API 集成和浏览器扩展开发。</p>
            <p>后来，我逐渐发现，比起只完成别人提出的需求，我更喜欢自己发现问题、设计解决方案，并把产品真正发布出去。AI Chat Backup 是这条路上一个重要的作品。</p>
            <p>开发一个产品并不只是写代码。还需要面对真实用户的反馈、不同平台的兼容性、不断变化的接口，以及上线之后持续出现的新问题。</p>
            <p><strong>好的产品不一定复杂，但应该解决一个真实存在的问题。</strong></p>
            <p>现在，我仍然在写代码、做产品，也在探索 AI 能如何改变个人创造软件的方式。</p>
          </div>
        </section>

        <section className="about" aria-labelledby="capabilities-title">
          <h2 id="capabilities-title">What I Do</h2>
          <div className="about-card">
            {capabilities.map((item) => <p key={item.title}><strong>{item.title}</strong><br />{item.description}</p>)}
          </div>
        </section>

        <section className="about" aria-labelledby="notes-title">
          <h2 id="notes-title">Notes & Thoughts</h2>
          <div className="about-card">
            <p>关于创造、技术和互联网的一些记录。</p>
            <p>我会在这里分享做产品过程中的发现、遇到的问题，以及那些还没有确定答案的想法。</p>
            <p>Not everything needs to become a product. Some things are worth exploring just because they&apos;re interesting.</p>
          </div>
        </section>

        <footer className="contact" id="contact">
          <p className="eyebrow">Have an idea?</p>
          <h2>Let&apos;s build something useful.</h2>
          <p className="intro-copy">如果你正在做一个有趣的产品，或者只是想交流技术、AI 和互联网，欢迎联系我。</p>
          <a className="email-link" href={`mailto:${site.email}`}>Say hello · {site.email} <span aria-hidden="true">↗</span></a>
          <div className="footer-profile">
            <div className="footer-profile-main">
              <span className="footer-profile-mark" aria-hidden="true">
                <Image src="/images/dog-avatar.png" alt="" fill sizes="56px" />
              </span>
              <div>
                <p className="footer-profile-name">adog.space</p>
                <p className="footer-profile-bio">写代码，做产品，解决真实的问题。</p>
              </div>
            </div>
            <nav className="footer-project-links" aria-label="我的产品">
              {projects.filter((project) => project.link).slice(0, 3).map((project) => (
                <a key={project.number} href={project.link} target="_blank" rel="noreferrer">{project.title}<span aria-hidden="true">↗</span></a>
              ))}
            </nav>
          </div>
          <div className="footer-bottom">
            <a className="wordmark" href="#top">adog.space</a>
            <span>© 2026 adog.space</span>
            <nav className="footer-nav" aria-label="页脚导航">
              <a href="#work">作品</a>
              <a href="#about">关于</a>
              <a href="#contact">联系</a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
