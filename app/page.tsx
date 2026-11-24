import StationCards from "@/components/station-cards";
import { defaults, readSettings } from "@/lib/wiki-content";
import Link from "next/link";
import { getDb } from "@/db";
import { streamers } from "@/db/schema";

const posterUrl = "https://www.sooplive.com/station/o0opha/post/213478053";

export default async function Home() {
  const settings = await readSettings();
  const t = (key:string) => settings[key] ?? defaults[key];
  const broadcasterRows = await getDb().select().from(streamers);

  return (
    <main className="min-h-screen text-white">
      <header className="border-b border-sky-200/15 bg-[#07152f]/90">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
              <img src="/images/sushiro-header-mark.webp" alt="" width="44" height="44" className="size-11 object-contain" />
              <span className="brand-wordmark">{t("상단-6")}<span className="brand-wiki">{t("상단-7")}</span></span>
            </Link>
</div></div></header>
<div id="server"><section data-side={settings.heroSide} className="relative">
        <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-5 lg:px-12">
          <div className="order-2 max-w-2xl rounded-3xl bg-[#052b68]/55 p-6 shadow-[0_18px_60px_#00163c55] backdrop-blur-[2px] sm:p-9 lg:order-1 lg:bg-[#052b68]/80 lg:p-7">
            <p className="inline-flex rounded-full border border-white/35 bg-[#052e72]/75 px-4 py-2 text-sm font-extrabold tracking-[.14em] text-[#ffdf50] shadow-lg">{t("server-10")}</p>
            <h1 className="mt-5 text-4xl font-black leading-[1.12] tracking-tight drop-shadow-[0_4px_0_#073976] sm:text-5xl xl:text-6xl">{t("server-11")}<br/><span className="text-[#ffdb38]">{t("server-12")}</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white drop-shadow-md">{t("server-14")}</p>
            
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="rounded-xl bg-amber-300 px-5 py-3 font-bold text-slate-950" href="/wiki/rules">{t("rules-title")}</a><a className="rounded-xl border border-white/60 px-5 py-3 font-bold" href="#people">{t("people-52")}</a></div>
            <div className="mt-7 flex flex-wrap gap-2 text-sm font-bold">
              {[[t("server-17"), '#95f5ff'], [t("server-18"), '#ffdf50'], [t("server-19"), '#ffb59c']].map(([label, color]) => <span key={label} className="rounded-full border border-white/35 bg-[#052d70]/75 px-4 py-2 shadow-md" style={{color}}>{label}</span>)}
            </div>
          </div>
          <div className="order-1 mx-auto flex w-full max-w-[940px] flex-col items-center gap-2 lg:order-2 lg:max-w-none lg:gap-3">
            <img fetchPriority="high" src="/images/sushiro-promo-final.webp" alt="스시로 서버 · 초밥 요리 서버. 작살로 물고기를 잡아 요리하고, 강화로 깊은 바다에 도전합니다. 아쿠아리움에서 탈출하고 시청자 주문을 모두 제출하면 졸업합니다." className="block h-auto w-full" />
          </div>
        </div>
      </section></div>
<div className="mx-auto max-w-6xl px-5 py-8"><section id="people" className="border-t border-sky-100/15 pt-9">
          <p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">{t("people-51")}</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-black">{t("people-52")}</h2><p className="mt-1 text-sky-100/70">{t("people-53")}</p></div></div>
          {broadcasterRows.length ? <StationCards rows={broadcasterRows} linkLabel={t("people-55")}/> : <p className="mt-6 rounded-xl border border-dashed border-sky-100/30 p-6 text-sky-100/70">{t("people-56")}</p>}
        </section></div>
      <footer className="border-t border-sky-100/15 bg-[#06152f]"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-sky-100/65 sm:px-8"><span>{t("footer-81")}</span><a href={posterUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#ffdc48]">{t("footer-82")}</a></div></footer>
    </main>
  );
}
