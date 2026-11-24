"use client";
import {useState} from "react";
import {modules, defaultModules, parseModules, type ModuleId} from "@/lib/home-modules";

export default function HomeEditor({settings}:{settings:Record<string,string>}) {
  const [items,setItems]=useState(()=>settings.homeModules ? parseModules(settings.homeModules) : defaultModules);
  const [banner,setBanner]=useState(settings.homeBanner || "");
  const [status,setStatus]=useState("");
  const [busy,setBusy]=useState(false);
  function move(index:number, offset:number) {
    const next=[...items];
    [next[index],next[index+offset]]=[next[index+offset],next[index]];
    setItems(next);
    setStatus("");
  }
  async function upload(file:File) {
    setBusy(true);
    try {
      const response=await fetch("/api/media",{method:"POST",body:file});
      if (!response.ok) throw Error();
      setBanner((await response.json()).url);
      setStatus("이미지를 올렸습니다. 저장하면 홈에 표시됩니다.");
    } catch { setStatus("업로드 실패. 1.5 MB 이하 PNG·JPEG·WebP 이미지를 선택하세요."); }
    finally {setBusy(false);}
  }
  async function save() {
    setBusy(true);
    try {
      const response=await fetch("/api/customize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({homeModules:JSON.stringify(items),homeBanner:banner})});
      setStatus(response.ok?"공개 홈에 저장했습니다.":"저장하지 못했습니다. 로그인 상태를 확인하세요.");
    } catch {setStatus("연결을 확인한 뒤 다시 저장하세요.");}
    finally {setBusy(false);}
  }
  return <section className="my-8 rounded-xl bg-slate-900 p-5"><h2 className="text-2xl font-bold">홈 기능 관리</h2>
    <fieldset disabled={busy} className="mt-4 space-y-4"><ol className="space-y-2">{items.map((id,i)=><li key={id} className="flex flex-wrap items-center gap-3 rounded bg-slate-800 p-3"><strong className="grow">{modules[id]}</strong>
      <button disabled={i===0} onClick={()=>move(i,-1)}>위로</button><button disabled={i===items.length-1} onClick={()=>move(i,1)}>아래로</button><button onClick={()=>{setItems(items.filter(x=>x!==id));setStatus("");}}>홈에서 빼기</button></li>)}</ol>
      <div className="flex flex-wrap gap-3">{(Object.keys(modules) as ModuleId[]).filter(id=>!items.includes(id)).map(id=><button key={id} className="rounded bg-sky-900 p-2" onClick={()=>{setItems([...items,id]);setStatus("");}}>＋ {modules[id]}</button>)}</div>
      <label className="block">상단 홍보 이미지 교체<input type="file" className="block" accept="image/jpeg,image/png,image/webp" onChange={e=>{const f=e.target.files?.[0];if(f)void upload(f);e.target.value="";}}/></label>
      {banner&&<div><img src={banner} className="max-h-48" alt="새 홍보 이미지 미리보기"/><button onClick={()=>{setBanner("");setStatus("");}}>기본 홍보 이미지로 복원</button></div>}
      <button className="rounded bg-amber-300 px-4 py-2 font-bold text-black" onClick={save}>홈 구성 저장</button>
    </fieldset><p role="status">{status}</p></section>;
}

