"use client";

import { useState } from "react";

type Row = { id: string; name: string; stationUrl: string };

export default function AdminEditor({ initialRows }: { initialRows: Row[] }) {
  const [rows, setRows] = useState(initialRows);
  const [message, setMessage] = useState("");
  async function add(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const response = await fetch("/api/streamers", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: form.get("name"), stationUrl: form.get("stationUrl") }) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error || "저장에 실패했습니다."); return; }
    setRows((current) => [...current, data]);
    formElement.reset();
    setMessage("방송인을 저장했습니다.");
  }
  async function remove(id: string) {
    const response = await fetch("/api/streamers?id=" + encodeURIComponent(id), { method: "DELETE" });
    if (response.ok) setRows((current) => current.filter((row) => row.id !== id));
  }
  return <><form onSubmit={add} className="my-8 grid gap-3 rounded-xl bg-zinc-800 p-5"><label>방송인 이름<input name="name" required className="mt-1 block w-full rounded bg-zinc-950 p-3"/></label><label>SOOP 방송국 URL<input name="stationUrl" type="url" placeholder="https://www.sooplive.com/station/방송국ID" required className="mt-1 block w-full rounded bg-zinc-950 p-3"/></label><button className="justify-self-start rounded bg-amber-400 px-5 py-3 font-semibold text-black">저장</button><p role="status">{message}</p></form><ul className="space-y-3">{rows.map((row)=><li key={row.id} className="flex items-center justify-between rounded bg-zinc-800 p-4"><span>{row.name} · <a className="text-amber-300" href={row.stationUrl} target="_blank" rel="noreferrer">방송국</a></span><button onClick={()=>remove(row.id)} className="rounded border border-zinc-600 px-3 py-2">삭제</button></li>)}</ul></>;
}
