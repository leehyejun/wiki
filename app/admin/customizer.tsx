"use client";
import { useState } from "react";
import fields from "@/lib/wiki-fields.json";
const names:Record<string,string>={server:"메인 소개",ocean:"바다와 요리",orders:"주문 콘텐츠",schedule:"모집 일정",people:"참가 방송인",index:"위키 문서",api:"API 안내",footer:"하단"};
const sections=Object.keys(names).filter(key=>!["server","footer"].includes(key));
export default function Customizer({initial}:{initial:Record<string,string>}) {
 const [changes,setChanges]=useState<Record<string,string>>({});
 const [message,status]=useState("");
 const [busy,setBusy]=useState(false);
 const value=(key:string,fallback:string)=>changes[key]??initial[key]??fallback;
 const edit=(key:string,v:string)=>{setChanges(prev=>({...prev,[key]:v}));status("");};
 const order=value("order",sections.join(",")).split(",");
 function move(i:number,delta:number){const next=[...order];[next[i],next[i+delta]]=[next[i+delta],next[i]];edit("order",next.join(","));}
 async function save(){setBusy(true);try{const response=await fetch("/api/customize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(changes)});status(response.ok?"공개 사이트에 저장했습니다.":"저장하지 못했습니다. 권한과 빈 입력란을 확인하세요.");}catch{status("연결을 확인한 뒤 다시 저장하세요.");}finally{setBusy(false);}}
 return <section className="mt-10 space-y-4"><h2 className="text-2xl font-bold">커스텀 모드</h2><fieldset disabled={busy} className="space-y-3"><details open className="rounded bg-slate-800 p-4"><summary>화면 배치</summary><label className="my-4 block">메인 이미지 위치 <select className="bg-slate-950 p-2" value={value("heroSide","right")} onChange={e=>edit("heroSide",e.target.value)}><option value="left">왼쪽</option><option value="right">오른쪽</option></select></label>{order.map((key,i)=><div key={key} className="flex items-center gap-4 py-2"><label className="grow"><input type="checkbox" checked={value("hide-"+key,"no")!=="yes"} onChange={e=>edit("hide-"+key,e.target.checked?"no":"yes")}/> {names[key]}</label><button disabled={!i} onClick={()=>move(i,-1)}>위로</button><button disabled={i===order.length-1} onClick={()=>move(i,1)}>아래로</button></div>)}</details>
 {Array.from(new Set(Object.values(fields).map(f=>f.group))).map(group=><details key={group} className="rounded bg-slate-800 p-4"><summary>{names[group]??group} 문구</summary>{Object.entries(fields).filter(([,f])=>f.group===group).map(([key,f])=><label key={key} className="my-4 block text-sm text-sky-100">{f.label}<textarea className="mt-1 block w-full rounded bg-slate-950 p-3 text-white" rows={key.startsWith("doc-")?7:2} value={value(key,f.value)} maxLength={16000} onChange={e=>edit(key,e.target.value)}/></label>)}</details>)}
 <button disabled={!Object.keys(changes).length} onClick={save} className="rounded bg-amber-400 px-5 py-3 font-bold text-black">공개 사이트에 저장</button></fieldset><p role="status">{message}</p></section>;
}
