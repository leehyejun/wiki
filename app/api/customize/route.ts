import {getChatGPTUser} from "@/app/chatgpt-auth";
import {defaults,sections,writeSettings} from "@/lib/wiki-content";
export async function POST(request:Request) {
  const user = await getChatGPTUser();
  if (!user || user.email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) return new Response(null,{status:403});
  const input = await request.json().catch(()=>null);
  if (!input || typeof input!=="object" || Array.isArray(input)) return new Response(null,{status:400});
  const entries=Object.entries(input);
  function valid(key:string,value:unknown): value is string {
    if(typeof value!=="string") return false;
    if(key==="order") return value.split(",").sort().join(",")===[...sections].sort().join(",");
    if(key==="heroSide") return ["left","right"].includes(value);
    if(key.startsWith("hide-")) return sections.includes(key.slice(5)) && ["yes","no"].includes(value);
    return Object.hasOwn(defaults,key) && !!value.trim() && value.length <= 16000;
  }
  if(!entries.length || entries.some(([key,value])=>!valid(key,value))) return new Response(null,{status:400});
  await writeSettings(entries as [string,string][]);
  return Response.json({saved:true});
}
