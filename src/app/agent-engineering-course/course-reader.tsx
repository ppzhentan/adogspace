"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

export type CourseLesson = (typeof import("@/content/agent-course").lessons)[number];
export type CoursePreparation = typeof import("@/content/agent-course/00.json");

const groups = [
  { title: "01 / 基础原理", from: 1, to: 4 },
  { title: "02 / 工具与记忆", from: 5, to: 9 },
  { title: "03 / RAG 应用", from: 10, to: 13 },
  { title: "04 / 可靠与协作", from: 14, to: 18 },
  { title: "05 / 评估与 SaaS", from: 19, to: 25 },
];

function inline(text: string, onSelectLesson?: (number: number) => void) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const lessonLink = link[2].match(/lesson-(\d{2})\.md$/);
      if (lessonLink && onSelectLesson) return <a key={i} href={`#lesson-${lessonLink[1]}`} onClick={(event) => { event.preventDefault(); onSelectLesson(Number(lessonLink[1])); }}>{link[1]}</a>;
      return <a key={i} href={link[2]}>{link[1]}</a>;
    }
    return part;
  });
}

function Markdown({ source, onSelectLesson, omitHeading }: { source: string; onSelectLesson?: (number: number) => void; omitHeading?: string }) {
  const lines = source.replace(/^# [^\n]+\n+/, "").split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      const code: string[] = []; i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      nodes.push(<pre key={nodes.length}><code>{code.join("\n")}</code></pre>); continue;
    }
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|?\s*:?-{3,}/.test(lines[i + 1])) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        const row = lines[i++].split("|").slice(1, -1).map((cell) => cell.trim());
        if (!row.every((cell) => /^:?-{3,}:?$/.test(cell))) rows.push(row);
      }
      nodes.push(<div className="lesson-table-wrap" key={nodes.length}><table><thead><tr>{rows[0]?.map((cell, n) => <th key={n}>{inline(cell, onSelectLesson)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, n) => <tr key={n}>{row.map((cell, j) => <td key={j}>{inline(cell, onSelectLesson)}</td>)}</tr>)}</tbody></table></div>); continue;
    }
    const heading = line.match(/^(#{2,6})\s+(.+)/);
    if (heading) {
      if (omitHeading && heading[2].includes(omitHeading)) { i++; continue; }
      const Tag = `h${Math.min(heading[1].length + 1, 6)}` as keyof React.JSX.IntrinsicElements;
      nodes.push(<Tag key={nodes.length}>{inline(heading[2], onSelectLesson)}</Tag>); i++; continue;
    }
    if (/^\s*([-*_])\1\1+\s*$/.test(line)) { nodes.push(<hr key={nodes.length} />); i++; continue; }
    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ""));
      nodes.push(<blockquote key={nodes.length}><p>{inline(quote.join(" "), onSelectLesson)}</p></blockquote>); continue;
    }
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*+]\s+/, ""));
      nodes.push(<ul key={nodes.length}>{items.map((item, n) => <li key={n}>{inline(item, onSelectLesson)}</li>)}</ul>); continue;
    }
    if (/^\s*\d+[.)、]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)、]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)、]\s+/, ""));
      nodes.push(<ol key={nodes.length}>{items.map((item, n) => <li key={n}>{inline(item, onSelectLesson)}</li>)}</ol>); continue;
    }
    const paragraph = [line]; i++;
    while (i < lines.length && lines[i].trim() && !/^(#{2,6}\s|```|\||>\s?|\s*[-*+]\s+|\s*\d+[.)、]\s+)/.test(lines[i])) paragraph.push(lines[i++]);
    nodes.push(<p key={nodes.length}>{inline(paragraph.join(" "), onSelectLesson)}</p>);
  }
  return <div className="lesson-markdown">{nodes}</div>;
}

export function CourseReader({ lessons, preparation }: { lessons: readonly CourseLesson[]; preparation: CoursePreparation }) {
  const [selected, setSelected] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrollToLessonRef = useRef(false);
  const activeLesson = lessons.find((lesson) => lesson.number === selected);
  const activeGroup = groups.find((group) => selected >= group.from && selected <= group.to);

  function scrollToLesson() {
    contentRef.current?.scrollIntoView({
      behavior: window.matchMedia("(max-width: 900px)").matches ? "smooth" : "instant",
      block: "start",
    });
  }

  useEffect(() => {
    const match = window.location.hash.match(/^#lesson-(\d{2})$/);
    if (match) {
      const number = Number(match[1]);
      if (number >= 0 && number <= lessons.length) {
        scrollToLessonRef.current = true;
        setSelected(number);
      }
    }
  }, [lessons.length]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const currentItem = nav?.querySelector<HTMLElement>(".sidebar-lesson.is-current");
    if (nav && currentItem) {
      const navBounds = nav.getBoundingClientRect();
      const itemBounds = currentItem.getBoundingClientRect();
      if (itemBounds.top < navBounds.top || itemBounds.bottom > navBounds.bottom) {
        nav.scrollTop += itemBounds.top - navBounds.top - (nav.clientHeight - itemBounds.height) / 2;
      }
    }
    if (scrollToLessonRef.current) {
      scrollToLessonRef.current = false;
      scrollToLesson();
    }
  }, [selected]);

  function selectLesson(number: number) {
    scrollToLessonRef.current = true;
    setSelected(number);
    setTocOpen(false);
    window.history.replaceState(null, "", `#lesson-${String(number).padStart(2, "0")}`);
    if (selected === number) {
      scrollToLessonRef.current = false;
      scrollToLesson();
    }
  }

  return <div className="course-reader" id="course-reader">
    <aside className="course-sidebar" aria-label="课程目录">
      <div className="course-sidebar-title"><span>学习目录 <i> / CONTENTS</i></span><small>25 LESSONS</small></div>
      <button className="course-mobile-toggle" type="button" aria-expanded={tocOpen} aria-controls="course-sidebar-nav" onClick={() => setTocOpen(!tocOpen)}><span>{selected === 0 ? "先导课 · 课程准备" : `${String(selected).padStart(2, "0")} · ${activeLesson?.title}`}</span><span aria-hidden="true">{tocOpen ? "收起 −" : "切换课程 +"}</span></button>
      <nav className={`course-sidebar-nav${tocOpen ? " is-open" : ""}`} id="course-sidebar-nav" ref={navRef}>
        <button className={`sidebar-lesson sidebar-preparation${selected === 0 ? " is-current" : ""}`} onClick={() => selectLesson(0)} aria-current={selected === 0 ? "page" : undefined}>
          <span className="sidebar-prep-mark" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M10 2.5v4M10 13.5v4M2.5 10h4m7 0h4M4.7 4.7l2.8 2.8m5 5 2.8 2.8m0-10.6-2.8 2.8m-5 5-2.8 2.8" /></svg></span><span className="sidebar-prep-title">课程准备</span>
        </button>
        {groups.map((group) => <section className="sidebar-group" key={group.title}>
          <h2>{group.title}</h2>
          {lessons.filter((lesson) => lesson.number >= group.from && lesson.number <= group.to).map((lesson) => <button className={`sidebar-lesson${selected === lesson.number ? " is-current" : ""}`} key={lesson.number} onClick={() => selectLesson(lesson.number)} aria-current={selected === lesson.number ? "page" : undefined}>
            <span>{String(lesson.number).padStart(2, "0")}</span><span className="sidebar-lesson-title">{lesson.title}</span>
          </button>)}
        </section>)}
      </nav>
      <Link className="sidebar-home" href="/">← 返回 adog.space</Link>
    </aside>

    <div className="course-reading-pane" ref={contentRef}>
      {selected === 0 ? <section className="course-lesson preparation-lesson" id="course-preparation">
        <p className="course-lesson-eyebrow">ORIENTATION <span>／</span> 先导课</p>
        <h2>{preparation.title}</h2>
        <Markdown source={preparation.body} onSelectLesson={selectLesson} />
        <button className="preparation-next" onClick={() => selectLesson(1)}>开始第 01 课 <span>→</span></button>
      </section> : activeLesson ? <article className="course-lesson" key={activeLesson.number} id={`lesson-${String(activeLesson.number).padStart(2, "0")}`}>
        <p className="course-lesson-eyebrow">{activeGroup?.title} <span>／</span> LESSON {String(activeLesson.number).padStart(2, "0")}</p>
        <h2>第 {String(activeLesson.number).padStart(2, "0")} 课：{activeLesson.title}</h2>
        <div className="lesson-download-row"><span>课程资料</span><a className="lesson-download" href={activeLesson.codeDownload} download>下载{activeLesson.codeLabel.replace("下载", "")} <span aria-hidden="true">↓</span></a></div>
        <Markdown source={activeLesson.body} omitHeading={activeLesson.title} />
        <div className="lesson-navigation">
          <button disabled={activeLesson.number === 1} onClick={() => selectLesson(activeLesson.number - 1)}>← 上一课</button>
          <span>{String(activeLesson.number).padStart(2, "0")} / 25</span>
          <button disabled={activeLesson.number === 25} onClick={() => selectLesson(activeLesson.number + 1)}>下一课 →</button>
        </div>
      </article> : null}
    </div>
  </div>;
}
