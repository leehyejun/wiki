import Link from "next/link";

const sections = [
  { title: "처음 오셨나요?", description: "서버에 접속하고 첫날을 시작하는 방법을 안내합니다.", href: "#start", icon: "✦", tone: "mint" },
  { title: "접속 문제 해결", description: "서버 접속, 리소스팩, 계정 문제를 빠르게 확인하세요.", href: "#trouble", icon: "⌁", tone: "blue" },
  { title: "서버에서 함께하기", description: "방송인과 팀, 길드, 거래에 필요한 정보를 모았습니다.", href: "#community", icon: "⌂", tone: "violet" },
  { title: "규칙과 운영 안내", description: "모두가 편하게 즐길 수 있도록 서버 약속을 확인하세요.", href: "#rules", icon: "◈", tone: "amber" },
];

const articles = [
  ["처음 오셨나요?", "서버 접속", "지원 버전과 접속 주소, 첫 접속 순서를 확인하세요.", "#start"],
  ["처음 오셨나요?", "첫날 생존 가이드", "스폰에서 기본 도구와 거점을 준비하는 방법입니다.", "#start"],
  ["문제 해결", "자주 묻는 질문", "접속과 게임 플레이 중 자주 생기는 문제를 모았습니다.", "#trouble"],
  ["문제 해결", "리소스팩이 보이지 않아요", "서버 리소스팩 적용 상태를 확인하는 방법입니다.", "#trouble"],
  ["커뮤니티", "방송인과 팀", "참가자별 활동과 팀 정보를 찾아보세요.", "#community"],
  ["커뮤니티", "거래와 상점", "광장 상점 이용과 거래 약속을 안내합니다.", "#community"],
  ["서버 안내", "서버 규칙", "건축과 방송, 분쟁 상황에 관한 기본 약속입니다.", "#rules"],
  ["서버 안내", "운영진에게 문의하기", "문제가 해결되지 않을 때 문의에 필요한 정보를 정리합니다.", "#rules"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#191b1e] text-[#f2f3f4]">
      <header className="border-b border-[#36393d] bg-[#191b1e]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
            <span className="grid size-10 place-items-center rounded-xl bg-[#c8974d] text-xl text-[#191b1e]">▦</span>
            <span>블록로그 <span className="font-normal text-[#a6abb1]">서버 위키</span></span>
          </Link>
          <nav className="order-3 flex w-full items-center justify-center gap-x-6 gap-y-2 overflow-x-auto text-sm text-[#c2c5ca] md:order-none md:w-auto">
            <a href="#start">처음 시작하기</a><a href="#world">서버 탐험</a><a href="#people">방송인</a><a href="#growth">성장</a><a href="#activities">콘텐츠</a><a href="#town">마을과 경제</a><a href="#help">이용 안내</a>
          </nav>
          <Link href="/admin" className="rounded-lg border border-[#555b61] px-4 py-2 text-sm font-semibold hover:bg-[#292c30]">관리자</Link>
        </div>
      </header>
      <section className="border-b border-[#36393d]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
            <div><p className="mb-4 text-sm font-semibold tracking-[.16em] text-[#d5ae68]">BLOCKLOG · SERVER GUIDE</p><h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">오늘은 서버에서<br/>무엇을 해볼까요?</h1></div>
            <div><p className="text-lg leading-8 text-[#b8bdc3]">처음 만나는 거점부터 새로운 모험과 방송 이야기까지.<br className="hidden sm:block"/> 지금 하고 싶은 일에서 시작해 보세요.</p><div className="mt-6 flex gap-3"><a href="#start" className="rounded-md bg-[#d4ab65] px-5 py-3 font-semibold text-[#202124]">처음 오셨나요?</a><a href="#world" className="rounded-md border border-[#64696f] px-5 py-3 font-semibold">서버 둘러보기</a></div></div>
          </div>
          <div className="relative mt-9 flex min-h-[260px] items-end overflow-hidden rounded-lg border border-[#41464b] bg-[linear-gradient(160deg,#668fb5_0%,#355b72_42%,#233a3e_43%,#66724c_65%,#394d38_100%)] p-6 sm:min-h-[350px]">
            <div className="absolute inset-x-[18%] bottom-[18%] h-28 -skew-x-12 rounded-[45%] bg-[#d2c5a0] opacity-90 shadow-[0_25px_60px_#18231d]" />
            <div className="absolute inset-x-[25%] bottom-[26%] h-24 -skew-x-12 rounded-[45%] bg-[#668456] shadow-[0_0_30px_#b8d99b]" />
            <div className="absolute left-[38%] top-[35%] size-20 bg-[#6a5038] shadow-[45px_25px_0_#896847,-54px_34px_0_#536e48]" />
            <span className="relative rounded bg-[#17191bd9] px-3 py-2 text-sm">서버의 주요 거점과 모험을 기록하는 위키</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#44484d] py-5 text-sm"><span><b className="mr-3">이번 시즌 안내</b><span className="text-[#b8bdc3]">일정과 공지는 위키에서 확인하세요</span></span><a href="#events" className="font-semibold text-[#d5ae68]">일정과 공지 보기 ↗</a></div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <section id="start" className="mb-12"><p className="text-sm font-semibold text-[#d5ae68]">START HERE</p><h2 className="mt-1 text-2xl font-bold">처음 만나는 서버 생활</h2><p className="mt-1 text-[#aeb4ba]">접속부터 첫 정착까지 차례대로 살펴보세요.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["01","서버 접속","버전과 주소, 접속 순서"],["02","첫 목표","시작 퀘스트와 기본 안내"],["03","방송인 찾기","참가자와 팀 활동 살펴보기"],["04","거점 정착","주요 장소와 이동 방법"]].map(([n,t,d])=><a key={n} href="#guide" className="rounded-xl border border-[#3b3f44] bg-[#222529] p-5 hover:border-[#c49b58]"><span className="text-sm font-semibold text-[#d5ae68]">{n}</span><h3 className="mt-3 font-bold">{t}</h3><p className="mt-1 text-sm text-[#aeb4ba]">{d}</p></a>)}</div></section>
        <section id="guide">
          <div className="mb-5 flex items-end justify-between"><div><p className="text-sm font-semibold text-[#508061]">QUICK GUIDE</p><h2 className="mt-1 text-2xl font-bold">핵심 안내</h2></div><span className="text-sm text-[#77847b]">필요한 주제를 골라보세요</span></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{sections.map((item)=><a key={item.title} href={item.href} className="rounded-2xl border border-[#e3e9e4] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"><span className="grid size-11 place-items-center rounded-xl bg-[#edf5ef] text-2xl text-[#36674a]">{item.icon}</span><h3 className="mt-5 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#69766d]">{item.description}</p><span className="mt-4 inline-block text-sm font-semibold text-[#39714e]">안내 보기</span></a>)}</div>
        </section>
        <section className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div><div className="mb-5"><p className="text-sm font-semibold text-[#508061]">HELP CENTER</p><h2 className="mt-1 text-2xl font-bold">자주 찾는 문서</h2></div><div className="overflow-hidden rounded-2xl border border-[#e3e9e4] bg-white">{articles.map(([group,title,description,href],i)=><a key={title} href={href} className="flex items-center gap-4 border-b border-[#edf0ed] px-5 py-4 last:border-0 hover:bg-[#f8faf8]"><span className="hidden min-w-24 text-xs font-semibold text-[#63836d] sm:block">{group}</span><span className="min-w-0 flex-1"><b className="block">{title}</b><small className="mt-1 block text-sm text-[#77847b]">{description}</small></span><span className="text-xl text-[#829087]">›</span></a>)}</div></div>
          <aside className="space-y-4"><section id="community" className="rounded-2xl bg-[#eaf2ec] p-6"><p className="text-sm font-semibold text-[#508061]">COMMUNITY</p><h2 className="mt-2 text-xl font-bold">함께 만드는 서버</h2><p className="mt-2 text-sm leading-6 text-[#65736a]">방송인, 팀, 길드와 함께 활동하는 데 필요한 안내를 확인하세요.</p><a className="mt-4 inline-block font-semibold text-[#346848]" href="#community">커뮤니티 안내 보기</a></section><section id="rules" className="rounded-2xl border border-[#e3e9e4] bg-white p-6"><p className="text-sm font-semibold text-[#508061]">POLICY & SUPPORT</p><h2 className="mt-2 text-xl font-bold">도움이 더 필요하신가요?</h2><p className="mt-2 text-sm leading-6 text-[#65736a]">서버 규칙과 문의 방법을 확인하고, 상황을 정리해 운영진에게 알려주세요.</p><a className="mt-4 inline-block font-semibold text-[#346848]" href="#rules">규칙 및 문의 안내</a></section><p className="px-1 text-xs leading-5 text-[#849087]">이 위키는 독립적인 커뮤니티 안내 사이트입니다. 인물·일정·접속 정보는 관리자가 등록합니다.</p></aside>
        </section>
      </div>
      <footer className="border-t border-[#e1e7e2] bg-white"><div className="mx-auto max-w-6xl px-5 py-6 text-sm text-[#77847b] sm:px-8">블록로그 · 마인크래프트 서버 커뮤니티 위키</div></footer>
    </main>
  );
}
