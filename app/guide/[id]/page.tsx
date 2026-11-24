import {GuideFace} from "@/components/guide-design";
import {notFound} from "next/navigation";
import {readSettings} from "@/lib/wiki-content";
import {parseTabs} from "@/lib/extra-tabs";
export const dynamic="force-dynamic";
export default async function Guide({params}:{params:Promise<{id:string}>}){
 const settings=await readSettings(); const tabs=parseTabs(settings.extraTabs);
 const {id}=await params; const tab=tabs.find(item=>item.id===id);
 if(!tab)notFound();
 return <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 text-white"><GuideFace tab={tab} tabs={tabs} labels={settings}/></main>;
}
