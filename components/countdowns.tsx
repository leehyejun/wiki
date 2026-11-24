"use client";
import {useEffect,useState} from "react";
export type Period={label:string,start:string,end:string};
export default function Countdowns({periods}:{periods:Period[]}){
 const [now,setNow]=useState<number|null>(null);
 useEffect(()=>{setNow(Date.now());const timer=setInterval(()=>setNow(Date.now()),1000);return ()=>clearInterval(timer);},[]);
 return <div aria-label="한국 시간 기준 일정" className="order-last grid w-full grid-cols-2 gap-2 lg:order-none lg:w-auto lg:flex-1 lg:max-w-xl">{periods.map(p=>{
  const start=Date.parse(p.start+"+09:00"),end=Date.parse(p.end+"+09:00");
  const active=now!==null&&now>=start&&now<end;
  const seconds=active?Math.floor((end-now!+999)/1000):0;
  const clock=[Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,"0")).join(":");
  const caption=now===null?"일정 확인 중":active?"진행 중":now<start?"시작 전":"종료";
  const detail=active?Math.floor(seconds/86400)+"일 "+clock:caption==="종료"?p.end.slice(5,10).replace("-","/")+" 마감":p.start.slice(5,10).replace("-","/")+" 시작";
  return <a key={p.label} href="/wiki/recruitment" title={p.start.replace("T"," ")+" ~ "+p.end.replace("T"," ")+" KST"} className={"rounded-lg border px-3 py-2 "+(active?"border-amber-400/60 bg-amber-400/10 text-amber-200":"border-slate-600/70 bg-slate-800/50 text-slate-300")}><span className="flex flex-wrap items-center justify-between gap-1 text-xs"><strong>{p.label}</strong>{caption}</span><span className="block font-bold tabular-nums">{detail}</span></a>;
 })}</div>;
}
