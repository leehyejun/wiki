import StationCards from "@/components/station-cards";
import { defaults, readSettings } from "@/lib/wiki-content";
import { getDb } from "@/db";
import { streamers } from "@/db/schema";

const posterUrl = "https://www.sooplive.com/station/o0opha/post/213478053";

export default async function Home() {
  const settings = await readSettings();
  const t = (key:string) => settings[key] ?? defaults[key];
  const broadcasterRows = await getDb().select().from(streamers);

  return (
    <main className="min-h-screen text-white">

      <section id="server" className="mx-auto grid max-w-[1640px] justify-items-center gap-4 py-6 sm:gap-6 sm:py-8">
        <h1><svg className="w-[min(78vw,520px)]" viewBox="330 14 670 222" role="img" aria-label="스시로 서버 · 초밥 요리 서버"><image href="/images/sushiro-promo-final.webp" width="1355" height="1160"/></svg></h1>
        <ol aria-label="서버 콘텐츠" className="promo-sequence">
          {["작살로 생선을 잡아 초밥 요리", "장비를 강화해 더 깊은 바다에서 고급 초밥 제작", "아쿠아리움에서 물고기를 잡아 탈출", "시청자 주문을 모두 제출하면 졸업"].map((caption,index)=>(
            <li key={caption}><img className="block aspect-[450/260] w-full object-fill" src={`/images/sushiro-promo-scene-${index+1}.webp`} alt={caption}/></li>
          ))}
        </ol>
        <svg className="w-[min(84vw,600px)]" viewBox="240 980 860 180" role="img" aria-label="지금 바로, 스시로 서버의 세계로 뛰어드세요!"><image href="/images/sushiro-promo-final.webp" width="1355" height="1160"/></svg>
      </section>
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:gap-7">
        <section aria-labelledby="concept-title" className="ocean-reading">
          <h2 id="concept-title" className="text-2xl font-black">{t("ocean-21")}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[["🌊","exploration",23],["🎣","cooking",25],["⚒️","gear",27],["🍣","cooking",29]].map(([icon,slug,n])=>(
              <a key={n} href={"/wiki/"+slug} className="rounded-xl bg-[#102f50] p-5 transition-colors hover:bg-[#153b60]">
                <span aria-hidden="true" className="text-2xl">{icon}</span>
                <h3 className="mt-2 font-bold text-amber-200">{t("ocean-"+n)}</h3>
                <p className="mt-1 text-sm leading-6 text-sky-100">{t("ocean-"+(Number(n)+1))}</p>
              </a>
            ))}
          </div>
          <a href="/wiki/orders" className="mt-4 block rounded-xl bg-[#102f50] p-5 transition-colors hover:bg-[#153b60]">
            <strong className="text-amber-200">{t("orders-39")}</strong>
            <p className="mt-1 text-sm leading-6">{t("orders-40")}</p>
          </a>
        </section>
        <section id="people" className="ocean-reading">
          
          <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-black">{t("people-52")}</h2><p className="mt-1 text-sky-100/70">{t("people-53")}</p></div></div>
          {broadcasterRows.length ? <StationCards rows={broadcasterRows} linkLabel={t("people-55")}/> : <p className="mt-4 rounded-xl bg-[#102f50] p-5 text-sky-100/80">{t("people-56")}</p>}
        </section>
        <section className="ocean-reading"><a href="/wiki/rules" className="block rounded-xl bg-[#102f50] p-5 transition-colors hover:bg-[#153b60]"><h2 className="font-bold text-amber-200">{t("rules-title")} →</h2><p className="mt-1 text-sm leading-6 text-sky-100">{t("rules-summary")}</p></a></section>
      </div>
      <footer className="border-t border-sky-100/15 bg-[#06152f]"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-sky-100/65 sm:px-8"><span>{t("footer-81")}</span><a href={posterUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#ffdc48]">{t("footer-82")}</a></div></footer>
    </main>
  );
}
