import { env } from "cloudflare:workers";
import { adminName, allowLoginAttempt, cookieName, startSession, endSession } from "@/lib/admin-session";

function back(query="",cookie?:string) {
  const headers = new Headers({ Location:"/admin"+query, "Cache-Control":"no-store" });
  if(cookie) headers.set("Set-Cookie",cookie);
  return new Response(null,{status:303,headers});
}
export async function POST(request:Request) {
  if(request.headers.get("sec-fetch-site")==="cross-site") return new Response(null,{status:403});
  const form = await request.formData();
  const attributes="; Path=/; HttpOnly; Secure; SameSite=Strict";
  if(form.get("action")==="logout") {
    await endSession();
    return back("",cookieName+"=; Max-Age=0"+attributes);
  }
  if(!await allowLoginAttempt(request.headers.get("cf-connecting-ip")??"shared")) return back("?error=limit");
  const secret=(env as unknown as Record<string,string>).WIKI_ADMIN_PASSWORD ?? process.env.WIKI_ADMIN_PASSWORD;
  if(!secret || form.get("username")!==adminName || form.get("password")!==secret) return back("?error=login");
  return back("",cookieName+"="+await startSession()+"; Max-Age=28800"+attributes);
}

