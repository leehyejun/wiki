import type {ExtraTab} from "@/lib/extra-tabs";
import docs from "@/lib/wiki-docs.json";
import fields from "@/lib/wiki-fields.json";
export function CardFace({tab,number}:{tab:ExtraTab,number?:number}){
 const ocean=tab.placement==="ocean";
 return <div className={"h-full overflow-hidden rounded-xl border "+(ocean?"border-amber-700 bg-gradient-to-br from-amber-950 to-slate-800":"border-sky-200/20 bg-[#0c2853]")}>{tab.image&&<img src={tab.image} alt={tab.alt} className="aspect-video w-full object-cover"/>}<div className="p-4">{ocean&&!tab.image&&<span className="mb-2 inline-block rounded-full bg-amber-300 px-2 text-sm font-black text-slate-900">{String(number??5).padStart(2,"0")}</span>}<h3 className="break-words font-bold text-amber-200">{tab.title||"카드 제목"}</h3>{tab.summary&&<p className="mt-1 break-words text-sm text-sky-100">{tab.summary}</p>}</div></div>;
}
export function GuideFace({tab,tabs,labels}:{tab:ExtraTab,tabs:ExtraTab[],labels?:Record<string,string>}){
 const wiki=tab.template==="wiki";
 return <div className={wiki?"grid gap-4 bg-[#071a3b] p-4 sm:grid-cols-[minmax(90px,.35fr)_1fr]":"bg-[#0a0a0b] p-5"}>{wiki&&<nav aria-label="문서 탐색" className="flex flex-wrap content-start gap-2 sm:flex-col">{docs.map(d=><a className="text-sm text-sky-200" key={d.slug} href={"/wiki/"+d.slug}>{labels?.[d.title]??fields[d.title as keyof typeof fields].value}</a>)}{tabs.filter(t=>t.template==="wiki").map(t=><a key={t.id} className="text-sm text-amber-200" href={"/guide/"+t.id}>{t.title}</a>)}</nav>}<article className="min-w-0"><a className="text-sm text-sky-200" href={tab.placement==="ocean"?"/#ocean":"/#index"}>← {tab.placement==="ocean"?"바다와 요리":"위키 문서 목록"}</a><h1 className="my-4 break-words text-3xl font-black text-amber-300">{tab.title||"문서 제목"}</h1>{wiki&&<p className="mb-4 border-b border-sky-100/20 pb-4 text-sky-200">{tab.summary}</p>}{tab.image&&<img alt={tab.alt} src={tab.image} className="mb-5 max-h-[70vh] w-full rounded-xl object-contain"/>}<p className="whitespace-pre-wrap break-words leading-7">{tab.body}</p></article></div>;
}
