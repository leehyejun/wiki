import { env } from "cloudflare:workers";
import fields from "./wiki-fields.json";
export const sections = ["ocean","orders","schedule","people","index","api"];
export const defaults = Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value]));
export async function readSettings(): Promise<Record<string,string>> {
  const exists = await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='wiki_settings'").first();
  if (!exists) return {};
  const rows = await env.DB.prepare("SELECT key,value FROM wiki_settings").all<{key:string,value:string}>();
  return Object.fromEntries(rows.results.map(row => [row.key,row.value]));
}
export async function getText() {
  const settings = await readSettings();
  return (key:string) => settings[key] ?? defaults[key] ?? "";
}
export async function writeSettings(entries:[string,string][]) {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS wiki_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)").run();
  await env.DB.batch(entries.map(([key,value]) => env.DB.prepare("INSERT INTO wiki_settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(key,value)));
}
