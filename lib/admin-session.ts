import { env } from "cloudflare:workers";
import { cookies } from "next/headers";

export const adminName = "admin_seora";
export const cookieName = "__Host-wiki-admin";
export const cookieOptions = { path: "/", httpOnly: true, secure: true, sameSite: "strict" as const };
const sessionSeconds = 8 * 60 * 60;

async function digest(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), n => n.toString(16).padStart(2, "0")).join("");
}

export async function isAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
  return !!await env.DB.prepare("SELECT 1 FROM admin_sessions WHERE token_hash=? AND expires>?")
    .bind(await digest(token), Date.now()).first();
}

export async function allowLoginAttempt(ip: string) {
  const window = 15 * 60 * 1000;
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS admin_attempts (bucket TEXT PRIMARY KEY, attempts INTEGER NOT NULL, expires INTEGER NOT NULL)").run();
  const now = Date.now();
  const bucket = await digest(ip + ":" + Math.floor(now/window));
  await env.DB.prepare("DELETE FROM admin_attempts WHERE expires<=?").bind(now).run();
  const row = await env.DB.prepare("INSERT INTO admin_attempts VALUES (?,1,?) ON CONFLICT(bucket) DO UPDATE SET attempts=attempts+1 RETURNING attempts")
    .bind(bucket, now+window).first<{attempts:number}>();
  return !!row && row.attempts <= 8;
}

export async function startSession() {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), n => n.toString(16).padStart(2, "0")).join("");
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS admin_sessions (token_hash TEXT PRIMARY KEY, expires INTEGER NOT NULL)").run();
  await env.DB.prepare("DELETE FROM admin_sessions WHERE expires<=?").bind(Date.now()).run();
  await env.DB.prepare("INSERT INTO admin_sessions VALUES (?,?)").bind(await digest(token),Date.now()+sessionSeconds*1000).run();
  return token;
}

export async function endSession() {
  const token = (await cookies()).get(cookieName)?.value;
  if(token && await isAdmin()) await env.DB.prepare("DELETE FROM admin_sessions WHERE token_hash=?").bind(await digest(token)).run();
}

