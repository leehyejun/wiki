"use client";
import {usePathname} from "next/navigation";

export default function SiteTabs({name,suffix}:{name:string;suffix:string}){
 const path=usePathname();
 if(path?.startsWith("/admin"))return null;
 return <header className="site-switch"><div className="site-switch-inner">
  <a className="site-brand" href="/"><img src="/images/sushiro-header-mark.webp" width="36" height="36" alt=""/><span className="brand-wordmark">{name} <span className="brand-wiki">{suffix}</span></span></a>
  {path!=="/" && <form action="/wiki" method="get" role="search"><input key={path} type="search" aria-label="위키 검색어" name="q" placeholder="문서·지역·요리 검색" maxLength={160}/><button>검색</button></form>}
  <nav aria-label="사이트 영역"><a href="/" aria-current={path==="/"?"page":undefined}>홈</a><a href="/wiki/exploration" aria-current={path!=="/"?"page":undefined}>위키</a></nav>
 </div></header>;
}
