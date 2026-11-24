import {defaults,readSettings} from "@/lib/wiki-content";
import docs from "@/lib/wiki-docs.json";
import {regions} from "@/lib/regions";
import {parseTabs} from "@/lib/extra-tabs";
import {readRecipes} from "@/lib/recipes";
export const dynamic="force-dynamic";
const normalize=(value:string)=>value.normalize("NFC").toLocaleLowerCase("ko").replace(/\s+/g,"");
export default async function WikiIndex({searchParams}:{searchParams:Promise<{q?:string|string[]}>}){
 const raw=(await searchParams).q;
 const query=(typeof raw==="string"?raw:"").trim().slice(0,160);
 const terms=query.split(/\s+/).map(normalize);
 const settings=await readSettings();
 const labels={...defaults,...settings};
 const entries=[
  ...docs.map(d=>({title:labels[d.title],summary:labels[d.summary],body:labels[d.body],href:"/wiki/"+d.slug})),
  ...regions.map(r=>({title:labels["region-"+r.slug+"-title"],summary:"서버 탐험 · 지역 안내",body:labels["region-"+r.slug+"-body"],href:"/wiki/exploration/"+r.slug})),
  ...parseTabs(settings.extraTabs).map(t=>({title:t.title,summary:t.summary||"",body:t.body,href:"/guide/"+t.id})),
  ...readRecipes(settings.recipes).map(r=>({title:r.name,summary:r.materials,body:r.method,href:"/wiki/cooking#recipes"})),
 ];
 const matches=entries.filter(e=>terms.every(term=>normalize([e.title,e.summary,e.body].join(" ")).includes(term)));
 return <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 text-white"><h1 className="text-3xl font-black text-amber-300">{query?"검색 결과":"위키 문서"}</h1>{query&&<p className="my-4 text-sky-200">‘{query}’ · {matches.length}건　<a href="/wiki" className="underline">전체 문서</a></p>}
 {matches.length?<div className="mt-6 grid gap-3 sm:grid-cols-2">{matches.map((e,i)=><a key={e.href+i} href={e.href} className="rounded-xl border border-sky-200/20 bg-[#102a50] p-5 hover:border-sky-300"><strong className="text-lg text-amber-200">{e.title}</strong><p className="mt-1 text-sky-100">{e.summary}</p></a>)}</div>:<p className="mt-6">일치하는 문서가 없습니다. 다른 단어로 검색해 보세요.</p>}</main>;
}
