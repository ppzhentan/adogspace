import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 · 页面不存在</p><h1>找不到这一页。</h1><Link className="nav-contact" href="/">返回首页 <span aria-hidden="true">↗</span></Link></main>;
}
