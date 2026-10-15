import Image from "next/image";
import { explorations, projects, site } from "@/data/site";
import { DomainStrip } from "@/app/domain-strip";

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
        <DomainStrip />
        <section className="intro" id="top" aria-labelledby="intro-title">
          <p className="eyebrow">INDEPENDENT BUILDER · AI &amp; INTERNET</p>
          <h1 id="intro-title">Ideas into things.</h1>
          <p className="intro-subtitle">把想法变成真正存在的东西。</p>
          <p className="intro-copy">我是 adog，一个独立创造互联网产品的人。<br />我喜欢发现问题、尝试新工具，然后亲手把想法做出来。从浏览器扩展到 AI 驱动的工作流，我持续探索一个人在今天究竟能创造些什么。</p>
          <a className="text-link" href="#work">Explore what I&apos;ve built <span aria-hidden="true">→</span></a>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">Things I&apos;ve Built</h2>
            <p>小而具体，试着解决真实问题。</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project${project.number === "01" ? " project-featured" : ""}`} key={project.number}>
                {project.image && <>
                  <p className="project-feature-label">{project.imageLabel ?? (project.number === "01" ? "Featured Project" : "Concept artwork")} <span>{project.number} / 03</span></p>
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
                <ul className="project-tags" aria-label="产品特点">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                {project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} ↗</a> : <span className="project-link-missing">项目链接待补充</span>}
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <h2 id="about-title">I like making things.</h2>
          <div className="about-card">
            <p>我最初是一名软件开发者。</p>
            <p>多年的开发经历让我学会了如何构建复杂系统，但真正让我着迷的，一直不是某种编程语言，而是创造本身。</p>
            <p>AI 正在改变一个人构建产品的方式。</p>
            <p>我开始重新思考，当一个人能够借助 AI 完成更多工作时，什么样的产品值得创造？</p>
            <p>我没有确定的答案，所以继续做产品、尝试工具、观察用户、记录过程。</p>
            <p><strong>Less about the tools. More about what we can make.</strong></p>
          </div>
        </section>

        <section className="about" aria-labelledby="capabilities-title">
          <h2 id="capabilities-title">Currently Exploring</h2>
          <div className="about-card">
            {explorations.map((item) => <p key={item.title}><strong>{item.title}</strong><br />{item.description}</p>)}
          </div>
        </section>

        <footer className="contact" id="contact">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s make something interesting.</h2>
          <p className="intro-copy">有想法、有问题，或者只是想聊聊互联网和 AI？</p>
          <a className="email-link" href={`mailto:${site.email}`}>Say hello · {site.email} <span aria-hidden="true">↗</span></a>
          <div className="footer-profile">
            <div className="footer-profile-main">
              <span className="footer-profile-mark" aria-hidden="true">
                <Image src="/images/dog-avatar.png" alt="" fill sizes="56px" />
              </span>
              <div>
                <p className="footer-profile-name">adog.space</p>
                <p className="footer-profile-bio">把想法变成真正存在的东西。</p>
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
