import type { Metadata } from "next";
import Link from "next/link";
import { coursePreparation, lessons } from "@/content/agent-course";
import { CourseReader } from "./course-reader";
import "./course.css";

export const metadata: Metadata = {
  title: "从零构建 AI Agent · 25 课教程",
  description: "基于 Python、Ollama 与本地大模型的 AI Agent 中文教程。",
  alternates: { canonical: "/agent-engineering-course" },
};

export default function AgentEngineeringCourse() {
  return <>
    <header className="site-header course-header">
      <Link className="wordmark" href="/">adog.space</Link>
      <nav aria-label="主导航"><Link href="/">首页</Link><a href="#course-reader">课程目录</a></nav>
    </header>
    <main id="main" className="course-page">
      <section className="course-intro" aria-labelledby="course-title">
        <div>
          <p className="eyebrow">OPEN COURSE / 25 LESSONS</p>
          <h1 id="course-title">从零构建 AI Agent</h1>
          <p className="course-deck">从本地模型调用开始，亲手构建一个可靠的 Agent 系统。</p>
        </div>
      </section>
      <CourseReader lessons={lessons} preparation={coursePreparation} />
    </main>
    <footer className="course-footer"><span>从零构建 AI Agent</span><Link href="/">adog.space</Link></footer>
  </>;
}
