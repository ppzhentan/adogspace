import { projects, site } from "@/data/site";

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
        <section className="intro" id="top" aria-labelledby="intro-title">
          <p className="eyebrow">你好，欢迎来到 adog.space</p>
          <h1 id="intro-title">这是 adog.space，我的个人主页。</h1>
          <p className="intro-copy">{site.description}</p>
          <p className="intro-copy">{site.about}</p>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">一些作品</h2>
            <p>目前能从仓库确认的项目记录。</p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project" key={`${project.title}-${index}`}>
                <div className="project-image" role="img" aria-label={`${project.title}的项目图片待补充`}>
                  <span className="image-index">0{index + 1} / {String(projects.length).padStart(2, "0")}</span>
                  <span className="image-placeholder">此项目的真实图片待补充</span>
                  <span className="image-hint">请添加你希望展示的项目图片</span>
                </div>
                <div className="project-heading">
                  <h3>{project.title}</h3>
                  <span>{project.year}</span>
                </div>
                <p className="project-meta">{project.type}</p>
                <p className="project-description">{project.description}</p>
                <p className="project-missing">{project.detailsMissing}</p>
              </article>
            ))}
          </div>
          <p className="placeholder-note">这条记录来自仓库中的旧版页面，不代表已确认你的个人职责或项目成果。</p>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <h2 id="about-title">关于我</h2>
          <div className="about-card">
            <div className="about-card-heading">
              <span className="about-monogram" aria-hidden="true">a</span>
              <div><h3>{site.name}</h3><p>{site.role}</p></div>
            </div>
            <p>{site.about}</p>
            <dl>
              {site.location && <div><dt>所在</dt><dd>{site.location}</dd></div>}
              <div><dt>联系</dt><dd>{site.email}</dd></div>
            </dl>
          </div>
        </section>

        <footer className="contact" id="contact">
          <p className="eyebrow">想一起做点什么？</p>
          <h2>欢迎来信。</h2>
          {site.email.startsWith("[") ? (
            <p className="email-placeholder">{site.email} <span>请替换为真实邮箱</span></p>
          ) : (
            <a className="email-link" href={`mailto:${site.email}`}>{site.email} <span aria-hidden="true">↗</span></a>
          )}
          <div className="footer-bottom">
            <a className="wordmark" href="#top">adog.space</a>
            <span>© {new Date().getFullYear()} {site.name}</span>
            <a href="#top">回到顶部 ↑</a>
          </div>
        </footer>
      </main>
    </>
  );
}
