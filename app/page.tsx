import Link from "next/link";
import { getDb } from "@/db";
import { streamers } from "@/db/schema";

const links = [
  ["서버 소개", "#server"],
  ["바다와 요리", "#ocean"],
  ["주문 콘텐츠", "#orders"],
  ["방송인", "#people"],
  ["API 안내", "#api"],
];

const posterUrl = "https://www.sooplive.com/station/o0opha/post/213478053";

export default async function Home() {
  const broadcasterRows = await getDb().select().from(streamers);

  return (
    <main className="min-h-screen bg-[#071a3b] text-white">
      <header className="border-b border-sky-200/15 bg-[#07152f]/90">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
              <span className="grid size-11 place-items-center rounded-xl border-2 border-[#a85827] bg-[#ffc72c] text-2xl text-[#24354e] shadow-[inset_0_-4px_0_#e59c20]">🍣</span>
              <span className="text-lg">스시로 서버 <span className="font-normal text-sky-100/75">위키</span></span>
            </Link>
            <div className="flex items-center gap-3">
              <a href="#index" className="rounded-lg border border-sky-100/40 px-4 py-2 text-sm">문서 찾아보기</a>
              <Link href="/admin" className="rounded-lg border border-[#a85827] bg-[#ffc72c] px-4 py-2 text-sm font-bold text-[#1e2e44] shadow-[inset_0_-3px_0_#e59c20]">관리자</Link>
            </div>
          </div>
          <nav aria-label="위키 주제" className="mt-5 flex gap-6 overflow-x-auto whitespace-nowrap pb-1 text-sm font-semibold text-sky-100/85">
            {links.map(([name, href]) => <a key={name} href={href} className="transition hover:text-[#ffd84b]">{name}</a>)}
          </nav>
        </div>
      </header>

      <section id="server" className="relative overflow-hidden border-b border-sky-200/20 bg-[radial-gradient(ellipse_at_75%_5%,#34c9f4_0%,#087bc8_34%,#0752ad_64%,#092b70_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_12%_22%,white_0_2px,transparent_3px),radial-gradient(circle_at_75%_42%,#a5f5ff_0_3px,transparent_4px),radial-gradient(circle_at_38%_70%,white_0_2px,transparent_4px)] [background-size:170px_130px,230px_190px,190px_160px]" />
        <div className="relative mx-auto grid max-w-6xl gap-9 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-[1fr_.75fr] md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/30 bg-[#052e72]/55 px-4 py-2 text-sm font-extrabold tracking-[.14em] text-[#ffdf50]">스시로 서버 · 초밥 요리 모험</p>
            <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight drop-shadow-[0_4px_0_#073976] sm:text-6xl">바다를 누비고<br/><span className="text-[#ffdb38]">초밥을 완성하다</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/90">작살로 물고기를 잡고, 깊은 바다의 재료로 초밥을 만드세요. 손님들의 주문을 채우며 스시로 서버의 세계를 탐험합니다.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#ocean" className="rounded-xl border-2 border-[#a85827] bg-[#ffd333] px-5 py-3 font-extrabold text-[#182a44] shadow-[inset_0_-4px_0_#e19a1b]">서버 살펴보기</a>
              <a href={posterUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border-2 border-white/45 bg-[#082f70]/50 px-5 py-3 font-bold text-white hover:bg-[#082f70]/80">SOOP 모집 공지</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-sm font-bold">
              {[["바다", "#95f5ff"], ["19종 물고기", "#ffdf50"], ["초밥 요리", "#ffb59c"]].map(([label, color]) => <span key={label} className="rounded-full border border-white/20 bg-[#052d70]/55 px-4 py-2" style={{color}}>{label}</span>)}
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[390px] rotate-[1deg] rounded-[1.4rem] border-[9px] border-[#7a3d22] bg-[#47291f] p-2 shadow-[0_22px_70px_#001339aa,inset_0_0_0_2px_#f3ba67] sm:p-3">
            <img src="/images/sushiro-recruitment-poster.webp" alt="스시로 서버 모집 포스터: 바다 낚시와 초밥 요리, 시청자 주문 미션 안내" className="block h-auto w-full rounded-lg" />
            <figcaption className="px-2 pb-1 pt-3 text-center text-sm font-bold text-[#ffe3a6]">서버 모집 포스터</figcaption>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-11 sm:px-8">
        <section id="ocean">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">EXPLORE · CATCH · COOK</p><h2 className="mt-2 text-3xl font-black">바다에서 식탁까지</h2></div>
            <p className="max-w-xl leading-7 text-sky-100/80">데이브 더 다이버에서 영감을 받은 초밥 요리 서버입니다. 더 깊은 바다로 갈수록 새로운 물고기와 요리에 도전할 수 있습니다.</p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["01", "바다 탐험", "단계별 바다에서 새로운 물고기를 만나요."], ["02", "작살 낚시", "직접 작살을 던져 재료를 모아요."], ["03", "장비 강화", "강화한 장비로 더 깊은 바다에 도전해요."], ["04", "초밥 요리", "잡은 물고기로 손님에게 초밥을 내요."]].map(([number,title,body]) => <article key={number} className="overflow-hidden rounded-xl border-2 border-[#8f572d] bg-[linear-gradient(155deg,#56381f,#30283a_70%)] p-5 shadow-[inset_0_0_0_2px_#d7a15944]"><p className="inline-grid size-9 place-items-center rounded-full border-2 border-[#9e5b24] bg-[#ffd439] font-black text-[#1d2b43] shadow-[inset_0_-3px_0_#e79d23]">{number}</p><h3 className="mt-4 text-lg font-extrabold text-[#ffe084]">{title}</h3><p className="mt-2 leading-6 text-white/80">{body}</p></article>)}
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border-2 border-[#80502f] bg-[#382a31] shadow-xl shadow-black/20"><img src="/images/sushiro-ocean-port.webp" alt="바다와 섬 사이에 자리한 마인크래프트 항구와 배" className="aspect-[16/8] w-full object-cover"/><figcaption className="border-t border-[#c38a4a]/40 px-5 py-4"><h3 className="font-bold text-[#ffe084]">바다로 나아가는 항구</h3><p className="mt-1 text-sm text-white/70">서버 소개 게시글에 담긴 항구 풍경</p></figcaption></figure>
            <figure className="overflow-hidden rounded-2xl border-2 border-[#80502f] bg-[#382a31] shadow-xl shadow-black/20"><img src="/images/sushiro-town.webp" alt="벚꽃과 전통 건물이 어우러진 마인크래프트 마을" className="aspect-[16/8] w-full object-cover"/><figcaption className="border-t border-[#c38a4a]/40 px-5 py-4"><h3 className="font-bold text-[#ffe084]">모험이 이어지는 마을</h3><p className="mt-1 text-sm text-white/70">스시로 서버의 또 다른 풍경</p></figcaption></figure>
          </div>
          <p className="mt-4 text-sm text-sky-100/65">서버 특징은 <a className="underline decoration-sky-100/40 underline-offset-4 hover:text-white" href={posterUrl} target="_blank" rel="noopener noreferrer">서라0의 SOOP 모집 공지</a>를 참고했습니다.</p>
        </section>

        <section id="orders" className="mt-14 overflow-hidden rounded-2xl border-2 border-[#9a6032] bg-[linear-gradient(110deg,#633a20,#2f2941_65%,#153d69)] p-6 shadow-[inset_0_0_0_2px_#edba6c33] sm:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-sm font-black tracking-[.16em] text-[#57ddf2]">VIEWER QUEST</p><h2 className="mt-2 text-2xl font-black text-[#ffdc48]">손님들의 주문을 모두 완성하세요</h2><p className="mt-3 max-w-2xl leading-7 text-white/85">시청자 주문을 모두 제출하면 졸업하는 목표가 준비되어 있습니다. 수중 감옥과 바다의 도전도 모집 공지에서 확인할 수 있습니다.</p></div><span aria-hidden="true" className="grid size-24 place-items-center rounded-2xl border-2 border-[#b7773b] bg-[#ffc833] text-5xl shadow-[inset_0_-5px_0_#dc921c]">🍣</span></div>
        </section>

        <section id="schedule" className="mt-14 rounded-2xl border border-sky-300/20 bg-[#0c2853] p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">RECRUITMENT</p><h2 className="mt-2 text-2xl font-black">모집 공지 일정</h2></div><a href={posterUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#ffdc48]">SOOP 원문에서 확인</a></div>
          <p className="mt-2 text-sm text-sky-100/65">공지 게시 시점의 일정입니다. 변경 내용은 원문 공지를 우선 확인해 주세요.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">{[["모집", "11월 26일 – 1월 4일 22:00"], ["인원 발표", "1월 5일 18:00"], ["서버 기간", "1월 10일 – 24일 · 2주"]].map(([label,value]) => <div key={label} className="rounded-xl border border-[#c28b47]/60 bg-[linear-gradient(130deg,#50301e,#2d2a3d)] p-4"><p className="text-sm font-semibold text-[#bfeeff]">{label}</p><p className="mt-2 font-bold text-[#ffe18a]">{value}</p></div>)}</div>
        </section>

        <section id="people" className="mt-14 border-t border-sky-100/15 pt-9">
          <p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">STREAMERS</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-black">참가 방송인</h2><p className="mt-1 text-sky-100/70">이름을 누르면 등록된 SOOP 방송국으로 이동합니다.</p></div><Link href="/admin" className="font-bold text-[#ffdc48]">방송인 관리</Link></div>
          {broadcasterRows.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{broadcasterRows.map((row) => <article key={row.id} className="rounded-xl border-2 border-[#80502f] bg-[linear-gradient(145deg,#49311f,#202b45)] p-5"><h3 className="text-lg font-extrabold text-[#ffe084]">{row.name}</h3><a className="mt-4 inline-flex rounded-lg border border-[#a85827] bg-[#ffd333] px-4 py-2 font-bold text-[#182a44] shadow-[inset_0_-3px_0_#e19a1b]" href={row.stationUrl} target="_blank" rel="noopener noreferrer">방송국 열기</a></article>)}</div> : <p className="mt-6 rounded-xl border border-dashed border-sky-100/30 p-6 text-sky-100/70">방송인 정보를 등록하면 이곳에 표시됩니다.</p>}
        </section>

        <section id="index" className="mt-14 border-t border-sky-100/15 pt-9">
          <p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">WIKI INDEX</p><h2 className="mt-2 text-2xl font-black">위키 문서</h2><p className="mt-1 text-sky-100/70">서버 정보가 정리되는 대로 주제별 문서를 추가합니다.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[["서버 탐험", "바다 단계와 지역별 정보", "#ocean"], ["낚시와 요리", "물고기와 초밥 제작 정보", "#ocean"], ["주문 콘텐츠", "시청자 참여와 졸업 목표", "#orders"], ["모집 일정", "참가 신청 공지와 기간", "#schedule"], ["참가 방송인", "참가자와 SOOP 방송국", "#people"], ["API 안내", "방송인 보상과 연동 안내", "#api"]].map(([title,body,href]) => <a key={title} href={href} className="rounded-xl border border-sky-200/20 bg-[#0c2853] p-5 transition hover:border-[#ffd43b]/75 hover:bg-[#12356b]"><h3 className="font-extrabold text-[#ffe084]">{title}</h3><p className="mt-2 text-sm leading-6 text-sky-100/75">{body}</p></a>)}</div>
        </section>

        <section id="api" className="mt-14 rounded-2xl border-2 border-[#916039] bg-[linear-gradient(115deg,#3b2b24,#1b2b49)] p-6 shadow-[inset_0_0_0_2px_#e4b76a22] sm:p-8">
          <p className="text-sm font-black tracking-[.16em] text-[#4bd4f5]">API GUIDE</p><h2 className="mt-2 text-2xl font-black text-[#ffdc48]">방송인 API 안내</h2>
          <p className="mt-3 max-w-3xl leading-7 text-white/80">방송인 보상, 지급 조건, 연동 방법을 정리할 문서 영역입니다. 운영진이 확정된 기준을 등록하면 이곳에서 확인할 수 있습니다.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">{[["보상 항목", "운영진 입력 대기"], ["지급 조건", "운영진 입력 대기"], ["연동 방법", "운영진 입력 대기"]].map(([title,body]) => <div key={title} className="rounded-lg border border-[#c28b47]/40 bg-black/15 p-4"><p className="font-bold text-[#ffe084]">{title}</p><p className="mt-2 text-sm text-white/65">{body}</p></div>)}</div>
        </section>
      </div>
      <footer className="border-t border-sky-100/15 bg-[#06152f]"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-sky-100/65 sm:px-8"><span>스시로 서버 위키</span><a href={posterUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#ffdc48]">서버 모집 공지 · SOOP</a></div></footer>
    </main>
  );
}
