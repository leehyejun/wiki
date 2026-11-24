import {periodDefaults,validPeriodDate} from "@/lib/periods";
import {parseTabs} from "@/lib/extra-tabs";
import {isAdmin} from "@/lib/admin-session";
import {defaults,sections,writeSettings} from "@/lib/wiki-content";
export async function POST(request:Request) {
  if (!await isAdmin()) return new Response(null,{status:403});
  const input = await request.json().catch(()=>null);
  if (!input || typeof input!=="object" || Array.isArray(input)) return new Response(null,{status:400});
  const entries=Object.entries(input);
  function valid(key:string,value:unknown): value is string {
    if(typeof value!=="string") return false;
    if(key==="extraTabs"){try{parseTabs(value);return true;}catch{return false;}}
    if(Object.hasOwn(periodDefaults,key))return validPeriodDate(value);
    if(key==="order") return value.split(",").sort().join(",")===[...sections].sort().join(",");
    if(key==="heroSide") return ["left","right"].includes(value);
    if(key.startsWith("hide-")) return sections.includes(key.slice(5)) && ["yes","no"].includes(value);
    return Object.hasOwn(defaults,key) && !!value.trim() && value.length <= 16000;
  }
  if(!entries.length || entries.some(([key,value])=>!valid(key,value))) return new Response(null,{status:400});
  if(entries.some(([key])=>Object.hasOwn(periodDefaults,key))){
    if(!Object.keys(periodDefaults).every(key=>typeof input[key]==="string"&&validPeriodDate(input[key])) || input.recruitStart>=input.recruitEnd || input.serverStart>=input.serverEnd)return new Response(null,{status:400});
    const format=(v:string)=>v.replace("T"," ");
    input["schedule-46"]=format(input.recruitStart)+" – "+format(input.recruitEnd);
    input["schedule-50"]=format(input.serverStart)+" – "+format(input.serverEnd);
  }
  await writeSettings(Object.entries(input) as [string,string][]);
  return Response.json({saved:true});
}
