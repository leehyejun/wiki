import { getChatGPTUser, chatGPTSignInPath } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { streamers } from "@/db/schema";
import Customizer from "./customizer";
import { readSettings } from "@/lib/wiki-content";
import AdminEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getChatGPTUser();
  const authorized = user && user.email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
  if (!user) return <main className="mx-auto max-w-xl p-10 text-white"><h1 className="text-3xl font-bold">관리자 로그인</h1><p className="my-4">ChatGPT 계정으로 로그인해 사이트 문구와 문서, 참가 방송인을 관리하세요.</p><a className="rounded bg-amber-400 px-4 py-2 text-black" target="_top" href={chatGPTSignInPath("/admin")}>로그인</a></main>;
  if (!authorized) return <main className="mx-auto max-w-xl p-10 text-white"><h1 className="text-3xl font-bold">관리자 권한이 없습니다</h1><p className="my-4">현재 계정 {user.email}에는 편집 권한이 없습니다.</p><a href="/">위키로 돌아가기</a></main>;
  const rows = await getDb().select().from(streamers);
  return <main className="mx-auto min-h-screen max-w-3xl p-6 text-white"><h1 className="text-3xl font-bold">사이트 관리</h1><p className="my-2 text-zinc-300">로그인 계정 {user.email}</p><a href="/" className="text-sky-200">공개 사이트 열기</a><h2 className="mt-8 text-2xl font-bold">참가 방송인 등록</h2><AdminEditor initialRows={rows}/><Customizer initial={await readSettings()}/></main>;
}
