import {getDb} from "@/db";
import {streamers} from "@/db/schema";
import {getLiveInfo} from "@/lib/soop-live";
export const dynamic="force-dynamic";
export async function GET(){
 const rows=await getDb().select().from(streamers);
 const result:Record<string,Awaited<ReturnType<typeof getLiveInfo>>>={};
 for(let i=0;i<rows.length;i+=5){
  await Promise.all(rows.slice(i,i+5).map(async row=>{result[row.id]=await getLiveInfo(row.stationUrl);}));
 }
 return Response.json(result,{headers:{"Cache-Control":"public, max-age=30, s-maxage=45"}});
}
