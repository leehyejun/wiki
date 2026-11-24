import RecipeBook from "@/components/recipe-book";
import {readRecipes} from "@/lib/recipes";
import GuideMenu from "@/components/guide-menu";
import {parseTabs} from "@/lib/extra-tabs";
import StationCards from "@/components/station-cards";
import {regions} from "@/lib/regions";
import {notFound,redirect} from "next/navigation";
import docs from "@/lib/wiki-docs.json";
import {defaults,readSettings} from "@/lib/wiki-content";
import {getDb} from "@/db";
import {streamers} from "@/db/schema";
export const dynamic="force-dynamic";
export default async function WikiPage({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 if(slug==="recruitment") redirect("/#schedule");
 const doc=docs.find(d=>d.slug===slug);
 if(!doc)notFound();
 const settings=await readSettings();
 const labels={...defaults,...settings};
 const t=(key:string)=>labels[key];
 const rows=slug==="streamers"?await getDb().select().from(streamers):[];
 return <main className="min-h-screen text-white"><header className="border-b border-sky-300/20 p-5"><a href="/" className="brand-wordmark">{t("상단-6")} <span className="brand-wiki">{t("상단-7")}</span></a></header><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[clamp(250px,23vw,320px)_minmax(0,1fr)]"><GuideMenu labels={labels} tabs={parseTabs(settings.extraTabs)} current={"/wiki/"+slug}/><article className="ocean-reading"><a href="/wiki?all=1" className="text-sm text-sky-200">← 위키 문서 목록</a><h1 className="mt-5 text-4xl font-black text-amber-300">{t(doc.title)}</h1><p className="mt-3 text-sky-200">{t(doc.summary)}</p><div className="my-6 whitespace-pre-wrap border-t border-sky-300/20 pt-6 leading-8">{t(doc.body)}</div>{slug==="cooking"&&<RecipeBook rows={readRecipes(settings.recipes)}/>}{slug==="exploration"&&<div className="grid gap-4 sm:grid-cols-2">{regions.map(r=><a className="overflow-hidden rounded-xl bg-sky-950" key={r.slug} href={"/wiki/exploration/"+r.slug}><img className="aspect-video w-full object-cover" src={r.image} alt={r.alt}/><strong className="block p-4">{t("region-"+r.slug+"-title")} 둘러보기 →</strong></a>)}</div>}{slug==="streamers"&&<StationCards rows={rows}/>}{slug==="api"&&<dl>{[75,77,79].map(n=><div className="my-3 rounded bg-sky-950 p-4" key={n}><dt className="font-bold text-amber-300">{t("api-"+n)}</dt><dd>{t("api-"+(n+1))}</dd></div>)}</dl>}</article></div></main>;
}

