"use client";
import {getLiveInfo} from "@/lib/soop-live";
import {useEffect,useState} from "react";
type Info={profile:string,state:string,title:string,preview:string};
export default function StationCards({rows,linkLabel="방송국 열기"}:{rows:{id:string,name:string,stationUrl:string}[],linkLabel?:string}){
 const [info,setInfo]=useState<Record<string,Info>>({});
 useEffect(()=>{
  const abort=new AbortController();
  async function update(){try{const r=await fetch("/api/live",{signal:abort.signal});const result:Record<string,Info>=r.ok?await r.json():{};await Promise.all(rows.map(async row=>{if(!result[row.id]||result[row.id].state==="unknown")result[row.id]=await getLiveInfo(row.stationUrl);}));if(!abort.signal.aborted)setInfo(result);}catch{/* Next refresh retries. */}}
  void update();
  const timer=setInterval(()=>{if(!document.hidden)void update()},60000);
  return ()=>{abort.abort();clearInterval(timer);};
 },[rows]);
 return <div className="my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{rows.map(row=>{
  const item=info[row.id];
  return <a key={row.id} href={row.stationUrl} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-xl border border-sky-200/25 bg-[#102a50] text-white hover:border-amber-300">
   {item?.preview&&<img key={item.preview} src={item.preview} alt={row.name+" 라이브 미리보기"} className="aspect-video w-full object-cover" onError={e=>{e.currentTarget.hidden=true}}/>}
   <div className="p-3"><div className="flex items-center gap-3">{item?.profile?<img alt="" src={item.profile} className="size-10 rounded-full ring-2 ring-sky-400"/>:<span className="grid size-10 place-items-center rounded-full bg-sky-900">{row.name.slice(0,1)}</span>}<div><strong>{row.name}</strong><p className={item?.state==="live"?"text-sm text-rose-300":"text-sm text-sky-200"}>{!item?"상태 확인 중":item.state==="live"?"● LIVE":item.state==="offline"?"오프라인":"상태 확인 불가"}</p></div></div>{item?.title&&<p className="mt-3 text-sm">{item.title}</p>}<span className="mt-3 inline-block text-sm text-amber-300">{linkLabel} ↗</span></div></a>;
 })}</div>;
}
