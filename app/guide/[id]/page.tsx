import {notFound} from "next/navigation";
import {readSettings} from "@/lib/wiki-content";
import {parseTabs} from "@/lib/extra-tabs";
export const dynamic="force-dynamic";
export default async function Guide({params}:{params:Promise<{id:string}>}){
 const tabs=parseTabs((await readSettings()).extraTabs);
 const {id}=await params; const tab=tabs.find(item=>item.id===id);
 if(!tab)notFound();
 return <main className="mx-auto max-w-4xl px-5 py-10 text-white"><a href="/">← 스시로 서버 Wiki</a><h1 className="my-6 break-words text-4xl font-black text-amber-300">{tab.title}</h1>{tab.image&&<img className="mb-6 max-h-[75vh] w-full rounded-xl object-contain" src={tab.image} alt={tab.alt}/>}<p className="whitespace-pre-wrap break-words leading-8">{tab.body}</p></main>
}
