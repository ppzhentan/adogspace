import type { Metadata } from "next";
import Link from "next/link";
import { coursePreparation, lessons } from "@/content/agent-course";
import { CourseReader } from "./course-reader";

export const metadata: Metadata = {
  title: "从零构建 AI Agent · 25 课教程",
  description: "基于 Python、Ollama 与本地大模型的 AI Agent 中文教程。",
  alternates: { canonical: "/agent-engineering-course" },
};

export default function AgentEngineeringCourse() {
  return <>
    <header className="site-header course-header">
      <Link className="wordmark" href="/">adog.space</Link>
      <nav aria-label="主导航"><Link href="/">首页</Link><a href="#course-reader">选择课程 <span aria-hidden="true">↓</span></a></nav>
    </header>
    <main id="main" className="course-page">
      <section className="course-hero">
        <h1>从零构建 AI Agent</h1>
        <div className="course-hero-bottom">
          <p className="course-deck">从本地模型调用开始，逐步构建工具、记忆、RAG 与可靠的 Agent 系统。</p>
          <Link className="course-back" href="/">返回 adog.space <span>↗</span></Link>
        </div>
        <p className="course-meta">25 节课程 <span>·</span> 5 个学习阶段 <span>·</span> 配套代码下载</p>
      </section>
      <CourseReader lessons={lessons} preparation={coursePreparation} />
    </main>
    <footer className="course-footer"><span>从零构建 AI Agent</span><Link href="/">adog.space</Link></footer>
  </>;
}
