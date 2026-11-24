"use client";
import {useState} from "react";
import {parseTabs,type ExtraTab} from "@/lib/extra-tabs";
export default function TabEditor({initial}:{initial:string}){
 const [tabs,setTabs]=useState(()=>parseTabs(initial));
 const [msg,setMsg]=useState("");const [busy,setBusy]=useState(false);
 function patch(id:string, fields:Partial<ExtraTab>){setTabs(prev=>prev.map(t=>t.id===id?{...t,...fields}:t));setMsg("");}
 async function upload(id:string,file:File){
  setBusy(true);
  try{const bitmap=await createImageBitmap(file);const scale=Math.min(1,1440/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext("2d")!.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
   const blob=await new Promise<Blob|null>(done=>canvas.toBlob(done,"image/webp",0.82));if(!blob)throw Error();
   const r=await fetch("/api/media",{method:"POST",body:blob});if(!r.ok)throw Error();patch(id,{image:(await r.json()).url});setMsg("사진을 추가했습니다. 탭을 저장해 공개하세요.");
  }catch{setMsg("사진을 올리지 못했습니다. 다른 이미지로 다시 시도하세요.");}finally{setBusy(false);}
 }
 async function save(){setBusy(true);try{const raw=JSON.stringify(tabs);parseTabs(raw);const r=await fetch("/api/customize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({extraTabs:raw})});if(!r.ok)throw Error();setMsg("탭을 공개 사이트에 저장했습니다.");}catch{setMsg("탭 이름과 입력 내용을 확인한 뒤 다시 저장하세요.");}finally{setBusy(false);}}
 return <section className="my-10"><h2 className="mb-4 text-2xl font-bold">탭 및 이미지 편집</h2><fieldset disabled={busy} className="grid gap-4">{tabs.map(tab=><div key={tab.id} className="grid gap-3 rounded-xl bg-slate-800 p-5"><label>탭 이름<input className="block w-full bg-slate-950 p-2" maxLength={80} value={tab.title} onChange={e=>patch(tab.id,{title:e.target.value})}/></label><label>본문<textarea className="block w-full bg-slate-950 p-2" rows={4} maxLength={16000} value={tab.body} onChange={e=>patch(tab.id,{body:e.target.value})}/></label><label>사진 선택<input className="block" type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(tab.id,file)}}/></label>{tab.image&&<><img className="max-h-44 rounded" src={tab.image} alt={tab.alt}/><label>사진 설명<input className="block w-full bg-slate-950 p-2" value={tab.alt} maxLength={200} onChange={e=>patch(tab.id,{alt:e.target.value})}/></label><button onClick={()=>patch(tab.id,{image:"",alt:""})}>사진 제거</button></>}<button onClick={()=>setTabs(tabs.filter(t=>t.id!==tab.id))}>탭 제거</button></div>)}<button disabled={tabs.length>=40} onClick={()=>setTabs([...tabs,{id:crypto.randomUUID(),title:"",body:"",image:"",alt:""}])}>＋ 새 탭</button><button className="rounded bg-amber-400 p-3 font-bold text-black" onClick={save}>탭 저장</button></fieldset><p role="status">{msg}</p></section>
}
