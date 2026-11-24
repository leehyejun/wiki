import HomeEditor from "./home-editor";
import RecipeEditor from "./recipe-editor";
import TabEditor from "./tab-editor";
import {isAdmin,adminName} from "@/lib/admin-session";
import { getDb } from "@/db";
import { streamers } from "@/db/schema";
import Customizer from "./customizer";
import { readSettings } from "@/lib/wiki-content";
import AdminEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function AdminPage({searchParams}:{searchParams:Promise<{error?:string}>}) {
  if (!await isAdmin()) {
    const {error}=await searchParams;
    return <main className="mx-auto max-w-md px-6 py-16 text-white"><a href="/" className="text-sky-200">← 스시로 서버 Wiki</a><h1 className="my-6 text-3xl font-bold">관리자 로그인</h1><form method="post" action="/api/admin/session" className="grid gap-4 rounded-xl bg-slate-900 p-6"><label>아이디<input required autoComplete="username" name="username" className="mt-1 block w-full rounded bg-slate-800 p-3"/></label><label>비밀번호<input required autoComplete="current-password" name="password" type="password" className="mt-1 block w-full rounded bg-slate-800 p-3"/></label>{error && <p role="alert">{error==="limit"?"로그인 시도가 많습니다. 15분 후 다시 시도하세요.":"아이디와 비밀번호를 확인하세요."}</p>}<button className="rounded bg-amber-400 p-3 font-bold text-black">로그인</button></form></main>;
  }
  const settings=await readSettings();
  const rows = await getDb().select().from(streamers);
  return <main className="mx-auto min-h-screen max-w-6xl p-6 text-white"><h1 className="text-3xl font-bold">사이트 관리</h1><p className="my-2 text-zinc-300">로그인 계정 {adminName}</p><form method="post" action="/api/admin/session"><button className="my-2 underline" name="action" value="logout">로그아웃</button></form><a href="/" className="text-sky-200">공개 사이트 열기</a><HomeEditor settings={settings}/><Customizer initial={settings}/><h2 className="mt-8 text-2xl font-bold">참가 방송인 등록</h2><AdminEditor initialRows={rows}/><RecipeEditor initial={settings.recipes}/><TabEditor initial={settings.extraTabs}/></main>;
}
