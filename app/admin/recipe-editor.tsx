"use client";
import {useState} from "react";
import {readRecipes,type Recipe} from "@/lib/recipes";
import RecipeBook from "@/components/recipe-book";
export default function RecipeEditor({initial}:{initial?:string}){
 const [rows,setRows]=useState(()=>readRecipes(initial));
 const [selected,select]=useState(0),[message,status]=useState(""),[busy,setBusy]=useState(false);
 const active=rows[selected];
 function edit(key:keyof Recipe,value:string){setRows(rows.map((r,i)=>i===selected?{...r,[key]:value}:r));status("");}
 async function save(){setBusy(true);try{const raw=JSON.stringify(rows);readRecipes(raw);const res=await fetch("/api/customize",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({recipes:raw})});if(!res.ok)throw Error("저장에 실패했습니다.");status("낚시와 요리 문서에 저장했습니다.");}catch(e){status(e instanceof Error?e.message:"저장에 실패했습니다.");}finally{setBusy(false);}}
 return <details className="my-8 rounded-xl bg-slate-800 p-5"><summary className="cursor-pointer text-xl font-bold">초밥 조합법 관리</summary><fieldset disabled={busy} className="mt-4 grid items-start gap-5 lg:grid-cols-2"><div className="grid gap-3">{rows.length>0&&<label>편집할 요리 <select className="bg-slate-950 p-2" value={selected} onChange={e=>select(Number(e.target.value))}>{rows.map((r,i)=><option key={i} value={i}>{r.name||"새 요리"}</option>)}</select></label>}<button onClick={()=>{select(rows.length);setRows([...rows,{name:"",materials:"",method:""}]);status("");}}>＋ 조합법 추가</button>{active&&<>{([["name","요리 이름"],["materials","필요 재료와 수량 (한 줄에 한 재료)"],["method","제작 방법 또는 조건"]] as const).map(([key,label])=><label key={key}>{label}<textarea className="block w-full rounded bg-slate-950 p-2" rows={key==="name"?1:4} value={active[key]} onChange={e=>edit(key,e.target.value)}/></label>)}<button onClick={()=>{setRows(rows.filter((_,i)=>i!==selected));select(0);status("");}}>선택 조합법 제거</button></>}<button className="rounded bg-amber-400 p-3 font-bold text-black" onClick={save}>조합법 공개 저장</button><p role="status">{message}</p></div><RecipeBook rows={rows}/></fieldset></details>;
}
