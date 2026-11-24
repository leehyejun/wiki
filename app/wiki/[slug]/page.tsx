import {notFound} from "next/navigation";
import docs from "@/lib/wiki-docs.json";
import {getText} from "@/lib/wiki-content";
import {getDb} from "@/db";
import {streamers} from "@/db/schema";
export const dynamic="force-dynamic";
export default async function WikiPage({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const doc=docs.find(d=>d.slug===slug);
 if(!doc)notFound();
 const t=await getText();
 const rows=slug==="streamers"?await getDb().select().from(streamers):[];
 return <main className="min-h-screen bg-[#071a3b] text-white"><header className="border-b border-sky-300/20 p-5"><a href="/" className="brand-wordmark">{t("상단-6")} <span className="brand-wiki">{t("상단-7")}</span></a></header><div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[210px_1fr]"><nav aria-label="위키 문서" className="flex flex-wrap content-start gap-2 md:flex-col">{docs.map(d=><a key={d.slug} href={"/wiki/"+d.slug} aria-current={slug===d.slug?"page":undefined} className="rounded-lg px-3 py-2 text-sky-100 aria-[current=page]:bg-sky-900 aria-[current=page]:text-amber-300">{t(d.title)}</a>)}</nav><article><a href="/#index" className="text-sm text-sky-200">← 위키 문서 목록</a><h1 className="mt-5 text-4xl font-black text-amber-300">{t(doc.title)}</h1><p className="mt-3 text-sky-200">{t(doc.summary)}</p><div className="my-6 whitespace-pre-wrap border-t border-sky-300/20 pt-6 leading-8">{t(doc.body)}</div>{slug==="exploration"&&<img src="/images/sushiro-ocean-port.webp" alt="서버 항구" className="rounded-xl"/>}{slug==="streamers"&&rows.map(row=><a key={row.id} href={row.stationUrl} className="block py-2 text-amber-300">{row.name} ↗</a>)}{slug==="recruitment"&&<><dl>{[45,47,49].map(n=><div key={n} className="flex gap-6 py-2"><dt>{t("schedule-"+n)}</dt><dd>{t("schedule-"+(n+1))}</dd></div>)}</dl><a href="https://www.sooplive.com/station/o0opha/post/213478053" className="text-amber-300">SOOP 모집 공지 ↗</a></>}{slug==="api"&&<dl>{[75,77,79].map(n=><div className="my-3 rounded bg-sky-950 p-4" key={n}><dt className="font-bold text-amber-300">{t("api-"+n)}</dt><dd>{t("api-"+(n+1))}</dd></div>)}</dl>}</article></div></main>;
}
