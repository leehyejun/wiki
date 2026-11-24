import docs from "@/lib/wiki-docs.json";
import type {ExtraTab} from "@/lib/extra-tabs";

type Props = {
  labels: Record<string,string>;
  tabs: ExtraTab[];
  current?: string;
  compact?: boolean;
};

export default function GuideMenu({labels,tabs,current,compact}:Props) {
  const groups = [
    {title:"플레이 가이드", links:docs.slice(0,3).map(d=>({href:"/wiki/"+d.slug,title:labels[d.title]}))},
    {title:"방송과 참여", links:docs.slice(3).map(d=>({href:"/wiki/"+d.slug,title:labels[d.title]}))},
    {title:"추가 문서", links:tabs.filter(tab=>tab.menu!==false).map(tab=>({href:"/guide/"+tab.id,title:tab.title}))},
  ].filter(group=>group.links.length);
  const contents = <nav aria-label="주제별 문서" className="guide-groups">{groups.map(group=><section key={group.title}><h2>{group.title}</h2>{group.links.map(link=><a key={link.href} href={link.href} aria-current={link.href===current?"page":undefined}>{link.title}</a>)}</section>)}</nav>;
  return <div className={compact?"guide-menu compact":"guide-menu sidebar"}>
    <details><summary>{compact ? labels["상단-8"] : "문서 메뉴"}</summary>{contents}</details>
    {!compact&&<div className="wide-guide">{contents}</div>}
  </div>;
}

