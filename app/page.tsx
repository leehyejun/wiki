import StationCards from "@/components/station-cards";
import { defaults, readSettings, sections } from "@/lib/wiki-content";
import Link from "next/link";
import { getDb } from "@/db";
import { streamers } from "@/db/schema";

function navigation(t: (key: string) => string) { return [
  [t("상단-1"), "#server"],
  [t("상단-2"), "#ocean"],
  [t("상단-3"), "#orders"],
  [t("상단-4"), "#people"],
  [t("상단-5"), "#api"],
]; }

const posterUrl = "https://www.sooplive.com/station/o0opha/post/213478053";

export default async function Home() {
  const settings = await readSettings();
  const t = (key:string) => settings[key] ?? defaults[key];
  const order = settings.order?.split(",") ?? sections;
  const broadcasterRows = await getDb().select().from(streamers);

  return (
    <main className="min-h-screen bg-[#071a3b] text-white">
      <header className="border-b border-sky-200/15 bg-[#07152f]/90">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
              <img src="/images/sushiro-header-mark.webp" alt="" width="44" height="44" className="size-11 object-contain" />
              <span className="brand-wordmark">{t("상단-6")}<span className="brand-wiki">{t("상단-7")}</span></span>
            </Link>
            <div className="flex items-center gap-3">
              <a href={settings["hide-index"]==="yes"?"/wiki/exploration":"#index"} className="rounded-lg border border-sky-100/40 px-4 py-2 text-sm">{t("상단-8")}</a>
              <Link href="/admin" className="rounded-lg border border-[#a85827] bg-[#ffc72c] px-4 py-2 text-sm font-bold text-[#1e2e44] shadow-[inset_0_-3px_0_#e59c20]">{t("상단-9")}</Link>
            </div>
          </div>
          <nav aria-label="위키 주제" className="mt-5 flex gap-6 overflow-x-auto whitespace-nowrap pb-1 text-sm font-semibold text-sky-100/85">
            {navigation(t).filter(([,href]) => settings["hide-"+href.slice(1)] !== "yes").map(([name, href]) => <a key={name} href={href} className="transition hover:text-[#ffd84b]">{name}</a>)}
          </nav>
        </div>
      </header>

      <section data-side={settings.heroSide} id="server" className="relative isolate overflow-hidden bg-[#053c85] bg-cover bg-center" style={{ backgroundImage: "url('/images/sushiro-underwater-bg.webp')" }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,27,74,.82)_0%,rgba(3,35,87,.6)_44%,rgba(1,48,112,.22)_100%)]" />
        <div className="mx-auto grid min-h-[720px] w-full max-w-[1720px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 lg:min-h-[780px] lg:grid-cols-[.8fr_1.2fr] lg:gap-5 lg:px-12">
          <div className="order-2 max-w-2xl rounded-3xl bg-[#052b68]/55 p-6 shadow-[0_18px_60px_#00163c55] backdrop-blur-[2px] sm:p-9 lg:order-1 lg:bg-transparent lg:p-0 lg:shadow-none">
            <p className="inline-flex rounded-full border border-white/35 bg-[#052e72]/75 px-4 py-2 text-sm font-extrabold tracking-[.14em] text-[#ffdf50] shadow-lg">{t("server-10")}</p>
            <h1 className="mt-5 text-4xl font-black leading-[1.12] tracking-tight drop-shadow-[0_4px_0_#073976] sm:text-5xl xl:text-6xl">{t("server-11")}<br/><span className="text-[#ffdb38]">{t("server-12")}</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white drop-shadow-md">{t("server-14")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={settings["hide-ocean"]==="yes"?"/wiki/exploration":"#ocean"} className="rounded-xl border-2 border-[#a85827] bg-[#ffd333] px-5 py-3 font-extrabold text-[#182a44] shadow-[inset_0_-4px_0_#e19a1b] transition hover:-translate-y-0.5">{t("server-15")}</a>
              <a href={posterUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border-2 border-white/60 bg-[#082f70]/70 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-[#082f70]">{t("server-16")}</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-2 text-sm font-bold">
              {[[t("server-17"), '#95f5ff'], [t("server-18"), '#ffdf50'], [t("server-19"), '#ffb59c']].map(([label, color]) => <span key={label} className="rounded-full border border-white/35 bg-[#052d70]/75 px-4 py-2 shadow-md" style={{color}}>{label}</span>)}
            </div>
          </div>
          <div className="order-1 mx-auto flex w-full max-w-[940px] flex-col items-center gap-2 lg:order-2 lg:max-w-none lg:gap-3">
            <img src="/images/sushiro-promo-final.webp" alt="스시로 서버 · 초밥 요리 서버. 작살로 물고기를 잡아 요리하고, 강화로 깊은 바다에 도전합니다. 아쿠아리움에서 탈출하고 시청자 주문을 모두 제출하면 졸업합니다." className="block h-auto w-full" />
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-11 sm:px-8">
        <section style={{order: order.indexOf("ocean"),display:settings["hide-ocean"]==="yes"?"none":undefined}} id="ocean">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">{t("ocean-20")}</p><h2 className="mt-2 text-3xl font-black">{t("ocean-21")}</h2></div>
            <p className="max-w-xl leading-7 text-sky-100/80">{t("ocean-22")}</p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["01", t("ocean-23"), t("ocean-24")], ["02", t("ocean-25"), t("ocean-26")], ["03", t("ocean-27"), t("ocean-28")], ["04", t("ocean-29"), t("ocean-30")]].map(([number,title,body]) => <article key={number} className="overflow-hidden rounded-xl border-2 border-[#8f572d] bg-[linear-gradient(155deg,#56381f,#30283a_70%)] p-5 shadow-[inset_0_0_0_2px_#d7a15944]"><p className="inline-grid size-9 place-items-center rounded-full border-2 border-[#9e5b24] bg-[#ffd439] font-black text-[#1d2b43] shadow-[inset_0_-3px_0_#e79d23]">{number}</p><h3 className="mt-4 text-lg font-extrabold text-[#ffe084]">{title}</h3><p className="mt-2 leading-6 text-white/80">{body}</p></article>)}
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border-2 border-[#80502f] bg-[#382a31] shadow-xl shadow-black/20"><img src="/images/sushiro-ocean-port.webp" alt="바다와 섬 사이에 자리한 마인크래프트 항구와 배" className="aspect-[16/8] w-full object-cover"/><figcaption className="border-t border-[#c38a4a]/40 px-5 py-4"><h3 className="font-bold text-[#ffe084]">{t("ocean-31")}</h3><p className="mt-1 text-sm text-white/70">{t("ocean-32")}</p></figcaption></figure>
            <figure className="overflow-hidden rounded-2xl border-2 border-[#80502f] bg-[#382a31] shadow-xl shadow-black/20"><img src="/images/sushiro-town.webp" alt="벚꽃과 전통 건물이 어우러진 마인크래프트 마을" className="aspect-[16/8] w-full object-cover"/><figcaption className="border-t border-[#c38a4a]/40 px-5 py-4"><h3 className="font-bold text-[#ffe084]">{t("ocean-33")}</h3><p className="mt-1 text-sm text-white/70">{t("ocean-34")}</p></figcaption></figure>
          </div>
          <p className="mt-4 text-sm text-sky-100/65">{t("ocean-35")}<a className="underline decoration-sky-100/40 underline-offset-4 hover:text-white" href={posterUrl} target="_blank" rel="noopener noreferrer">{t("ocean-36")}</a>{t("ocean-37")}</p>
        </section>

        <section style={{order: order.indexOf("orders"),display:settings["hide-orders"]==="yes"?"none":undefined}} id="orders" className="overflow-hidden rounded-2xl border-2 border-[#9a6032] bg-[linear-gradient(110deg,#633a20,#2f2941_65%,#153d69)] p-6 shadow-[inset_0_0_0_2px_#edba6c33] sm:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-sm font-black tracking-[.16em] text-[#57ddf2]">{t("orders-38")}</p><h2 className="mt-2 text-2xl font-black text-[#ffdc48]">{t("orders-39")}</h2><p className="mt-3 max-w-2xl leading-7 text-white/85">{t("orders-40")}</p></div><span aria-hidden="true" className="grid size-24 place-items-center rounded-2xl border-2 border-[#b7773b] bg-[#ffc833] text-5xl shadow-[inset_0_-5px_0_#dc921c]">🍣</span></div>
        </section>

        <section style={{order: order.indexOf("schedule"),display:settings["hide-schedule"]==="yes"?"none":undefined}} id="schedule" className="rounded-2xl border border-sky-300/20 bg-[#0c2853] p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">{t("schedule-41")}</p><h2 className="mt-2 text-2xl font-black">{t("schedule-42")}</h2></div><a href={posterUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#ffdc48]">{t("schedule-43")}</a></div>
          <p className="mt-2 text-sm text-sky-100/65">{t("schedule-44")}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">{[[t("schedule-45"), t("schedule-46")], [t("schedule-47"), t("schedule-48")], [t("schedule-49"), t("schedule-50")]].map(([label,value]) => <div key={label} className="rounded-xl border border-[#c28b47]/60 bg-[linear-gradient(130deg,#50301e,#2d2a3d)] p-4"><p className="text-sm font-semibold text-[#bfeeff]">{label}</p><p className="mt-2 font-bold text-[#ffe18a]">{value}</p></div>)}</div>
        </section>

        <section style={{order: order.indexOf("people"),display:settings["hide-people"]==="yes"?"none":undefined}} id="people" className="border-t border-sky-100/15 pt-9">
          <p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">{t("people-51")}</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-black">{t("people-52")}</h2><p className="mt-1 text-sky-100/70">{t("people-53")}</p></div><Link href="/admin" className="font-bold text-[#ffdc48]">{t("people-54")}</Link></div>
          {broadcasterRows.length ? <StationCards rows={broadcasterRows} linkLabel={t("people-55")}/> : <p className="mt-6 rounded-xl border border-dashed border-sky-100/30 p-6 text-sky-100/70">{t("people-56")}</p>}
        </section>

        <section style={{order: order.indexOf("index"),display:settings["hide-index"]==="yes"?"none":undefined}} id="index" className="border-t border-sky-100/15 pt-9">
          <p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">{t("index-57")}</p><h2 className="mt-2 text-2xl font-black">{t("index-58")}</h2><p className="mt-1 text-sky-100/70">{t("index-59")}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[[t("index-60"), t("index-61"), "/wiki/exploration"], [t("index-62"), t("index-63"), "/wiki/cooking"], [t("index-64"), t("index-65"), "/wiki/orders"], [t("index-66"), t("index-67"), "/wiki/recruitment"], [t("index-68"), t("index-69"), "/wiki/streamers"], [t("index-70"), t("index-71"), "/wiki/api"]].map(([title,body,href]) => <a key={title} href={href} className="rounded-xl border border-sky-200/20 bg-[#0c2853] p-5 transition hover:border-[#ffd43b]/75 hover:bg-[#12356b]"><h3 className="font-extrabold text-[#ffe084]">{title}</h3><p className="mt-2 text-sm leading-6 text-sky-100/75">{body}</p></a>)}</div>
        </section>

        <section style={{order: order.indexOf("api"),display:settings["hide-api"]==="yes"?"none":undefined}} id="api" className="rounded-2xl border-2 border-[#916039] bg-[linear-gradient(115deg,#3b2b24,#1b2b49)] p-6 shadow-[inset_0_0_0_2px_#e4b76a22] sm:p-8">
          <p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">{t("api-72")}</p><h2 className="mt-2 text-2xl font-black text-[#ffdc48]">{t("api-73")}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-white/80">{t("api-74")}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">{[[t("api-75"), t("api-76")], [t("api-77"), t("api-78")], [t("api-79"), t("api-80")]].map(([title,body]) => <div key={title} className="rounded-lg border border-[#c28b47]/40 bg-black/15 p-4"><p className="font-bold text-[#ffe084]">{title}</p><p className="mt-2 text-sm text-white/65">{body}</p></div>)}</div>
        </section>
      </div>
      <footer className="border-t border-sky-100/15 bg-[#06152f]"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-sky-100/65 sm:px-8"><span>{t("footer-81")}</span><a href={posterUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#ffdc48]">{t("footer-82")}</a></div></footer>
    </main>
  );
}
