"use client";
import {usePathname} from "next/navigation";

export default function SiteTabs(){
 const path=usePathname();
 if(path?.startsWith("/admin"))return null;
 return <div className="site-switch"><div className="site-switch-inner">
  <nav aria-label="사이트 영역"><a href="/" aria-current={path==="/"?"page":undefined}>홈</a><a href="/wiki/exploration" aria-current={path!=="/"?"page":undefined}>위키</a></nav>
  <form action="/wiki" method="get" role="search"><input key={path} type="search" aria-label="위키 검색어" name="q" placeholder="문서·지역·요리 검색" maxLength={160}/><button>검색</button></form>
 </div></div>;
}
