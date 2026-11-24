"use client";
import {useState} from "react";
import type {Recipe} from "@/lib/recipes";
export default function RecipeBook({rows}:{rows:Recipe[]}){
 const [query,search]=useState("");
 const matches=rows.filter(r=>(r.name+" "+r.materials).toLowerCase().includes(query.trim().toLowerCase()));
 return <section id="recipes" className="rounded-xl border border-sky-200/20 bg-[#102a50] p-5"><h2 className="text-2xl font-bold text-amber-200">초밥 조합법</h2>{!rows.length?<p className="mt-3 text-sky-100">아직 등록된 조합법이 없습니다.</p>:<><label className="my-4 block">요리 또는 재료 검색<input type="search" value={query} onChange={e=>search(e.target.value)} className="mt-1 block w-full rounded-lg bg-slate-950 p-3"/></label>{!matches.length&&<p>검색 결과가 없습니다.</p>}{matches.map((r,i)=><details key={r.name+i} className="border-t border-white/15 py-3"><summary className="cursor-pointer font-bold">{r.name}</summary><h3 className="mt-3 font-semibold text-sky-200">필요 재료 · 수량</h3><ul className="list-inside list-disc">{r.materials.split("\n").filter(Boolean).map((line,n)=><li key={n}>{line}</li>)}</ul>{r.method&&<p className="mt-3 whitespace-pre-wrap">{r.method}</p>}</details>)}</>}</section>;
}
