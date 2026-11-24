import {env} from "cloudflare:workers";
import {isAdmin} from "@/lib/admin-session";
export async function POST(req:Request){
 if(!await isAdmin())return new Response(null,{status:403});
 if(Number(req.headers.get("content-length"))>1500000)return new Response(null,{status:413});
 const bytes=await req.arrayBuffer(), b=new Uint8Array(bytes);
 if(!b.length||b.length>1500000)return new Response(null,{status:413});
 const magic=String.fromCharCode(...b.slice(0,12));
 const type=b[0]===255&&b[1]===216&&b[2]===255?"image/jpeg":magic.startsWith("\x89PNG\r\n\x1a\n")?"image/png":magic.startsWith("RIFF")&&magic.slice(8)==="WEBP"?"image/webp":"";
 if(!type)return new Response(null,{status:415});
 await env.DB.prepare("CREATE TABLE IF NOT EXISTS wiki_media (id TEXT PRIMARY KEY, type TEXT NOT NULL, image BLOB NOT NULL)").run();
 const id=crypto.randomUUID();
 await env.DB.prepare("INSERT INTO wiki_media VALUES(?,?,?)").bind(id,type,bytes).run();
 return Response.json({url:"/api/media/"+id},{status:201});
}
