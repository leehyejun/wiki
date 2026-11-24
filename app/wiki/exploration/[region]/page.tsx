import {notFound} from "next/navigation";
import {regions} from "@/lib/regions";
import {getText} from "@/lib/wiki-content";
export default async function RegionPage({params}:{params:Promise<{region:string}>}){
 const {region}=await params;
 const entry=regions.find(item=>item.slug===region);
 if(!entry)notFound();
 const t=await getText();
 return <main className="ocean-reading ocean-directory mx-auto max-w-5xl text-white"><a className="text-sky-200" href="/wiki/exploration">← 서버 탐험</a><h1 className="my-5 text-4xl font-black text-amber-300">{t("region-"+entry.slug+"-title")}</h1><img className="w-full rounded-xl" src={entry.image} alt={entry.alt}/><p className="my-6 whitespace-pre-wrap leading-8">{t("region-"+entry.slug+"-body")}</p><nav className="flex gap-5">{regions.filter(item=>item.slug!==region).map(item=><a className="text-sky-200" key={item.slug} href={"/wiki/exploration/"+item.slug}>{t("region-"+item.slug+"-title")} 둘러보기 →</a>)}</nav></main>;
}
