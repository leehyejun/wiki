import {env} from "cloudflare:workers";
export async function GET(_req:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 if(!/^[a-f0-9-]{36}$/.test(id))return new Response(null,{status:404});
 if(!await env.DB.prepare("SELECT 1 FROM sqlite_master WHERE name='wiki_media'").first())return new Response(null,{status:404});
 const row=await env.DB.prepare("SELECT type,image FROM wiki_media WHERE id=?").bind(id).first<{type:string,image:ArrayBuffer|number[]}>();
 return row?new Response(new Uint8Array(row.image as ArrayBuffer),{headers:{"Content-Type":row.type,"X-Content-Type-Options":"nosniff","Cache-Control":"public,max-age=31536000,immutable"}}):new Response(null,{status:404});
}
