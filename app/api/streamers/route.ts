import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { streamers } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";

export async function GET() {
  const rows = await getDb().select().from(streamers).orderBy(asc(streamers.name));
  return Response.json(rows);
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!user || !adminEmail || user.email.toLowerCase() !== adminEmail) {
    return Response.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }

  const input = await request.json().catch(() => null);
  const name = typeof input?.name === "string" ? input.name.trim() : "";
  const stationUrl = typeof input?.stationUrl === "string" ? input.stationUrl.trim() : "";
  let parsed: URL;
  try {
    parsed = new URL(stationUrl);
  } catch {
    return Response.json({ error: "올바른 방송국 URL을 입력해 주세요." }, { status: 400 });
  }
  if (!name || !["sooplive.com", "www.sooplive.com"].includes(parsed.hostname)) {
    return Response.json({ error: "이름과 SOOP 방송국 URL을 확인해 주세요." }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const now = Date.now();
  await getDb().insert(streamers).values({ id, name, stationUrl: parsed.toString(), createdAt: now, updatedAt: now });
  return Response.json({ id, name, stationUrl: parsed.toString() }, { status: 201 });
}

export async function DELETE(request: Request) {
  const user = await getChatGPTUser();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!user || !adminEmail || user.email.toLowerCase() !== adminEmail) {
    return Response.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "id가 필요합니다." }, { status: 400 });
  await getDb().delete(streamers).where(eq(streamers.id, id));
  return new Response(null, { status: 204 });
}
