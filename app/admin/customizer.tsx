"use client";


import { useState } from "react";
import fields from "@/lib/wiki-fields.json";
import docs from "@/lib/wiki-docs.json";
const panels=[
 {id:"server",label:"홈 · 상단과 하단",keys:["상단-6","상단-7","footer-81","footer-82"]},
 {id:"concept",label:"홈 · 활동과 졸업 목표",keys:["ocean-21","ocean-23","ocean-24","ocean-25","ocean-26","ocean-27","ocean-28","ocean-29","ocean-30","orders-39","orders-40"]},
 {id:"people",label:"홈 · 참가 방송인",keys:["people-51","people-52","people-53","people-55","people-56"]},
 ...docs.map(d=>({id:d.slug,label:"위키 · "+fields[d.title as keyof typeof fields].value,keys:[d.title,d.summary,d.body,...(d.slug==="api"?["api-75","api-76","api-77","api-78","api-79","api-80"]:[])]})),
 {id:"region",label:"위키 · 지역 안내",keys:Object.keys(fields).filter(k=>k.startsWith("region-"))}
];
export default function Customizer({initial}:{initial:Record<string,string>}) {

 const [panel,setPanel]=useState("server");
 const [changes,setChanges]=useState<Record<string,string>>({});
 const [message,status]=useState("");
 const [busy,setBusy]=useState(false);
 const value=(key:string,fallback:string)=>changes[key]??initial[key]??fallback;
 const edit=(key:string,v:string)=>{setChanges(prev=>({...prev,[key]:v}));status("");};
 const keys=panels.find(p=>p.id===panel)!.keys as (keyof typeof fields)[];
 async function save(){setBusy(true);try{const response=await fetch("/api/customize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(changes)});status(response.ok?"공개 사이트에 저장했습니다.":"저장하지 못했습니다. 권한과 빈 입력란을 확인하세요.");}catch{status("연결을 확인한 뒤 다시 저장하세요.");}finally{setBusy(false);}}
 return <section className="my-8 space-y-4">
 <h2 className="text-2xl font-bold">홈과 위키 편집</h2>
 <label>편집 영역 <select className="rounded bg-slate-800 p-2" value={panel} onChange={e=>setPanel(e.target.value)}>{panels.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}</select></label>
 <div className="grid items-start gap-5 lg:grid-cols-2"><fieldset disabled={busy} className="space-y-4 rounded-xl bg-slate-800 p-5">
 {keys.map(k=><label key={k} className="block text-sm">{fields[k].label}<textarea className="mt-1 block w-full rounded bg-slate-950 p-3" rows={k.startsWith("doc-")?6:2} value={value(k,fields[k].value)} onChange={e=>edit(k,e.target.value)} maxLength={16000}/></label>)}
 <button disabled={!Object.keys(changes).length} onClick={save} className="rounded bg-amber-400 p-3 font-bold text-black">공개 사이트에 저장</button></fieldset>
 <aside className="rounded-xl bg-[#0c2853] p-5 lg:sticky lg:top-4"><h3 className="mb-4 text-sm text-sky-200">저장 전 미리보기</h3><div><div className="min-w-0">{keys.map(k=><p className="mb-2 whitespace-pre-wrap break-words" key={k}>{value(k,fields[k].value)}</p>)}</div></div></aside></div><p role="status">{message}</p></section>;
}
