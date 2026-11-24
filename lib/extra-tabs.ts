export type ExtraTab={id:string,title:string,body:string,image:string,alt:string,summary?:string,placement?:"index"|"ocean",template?:"detail"|"wiki",menu?:boolean};
export function parseTabs(raw:string):ExtraTab[] {
 const tabs:unknown=JSON.parse(raw||"[]");
 if(!Array.isArray(tabs)||tabs.length>40)throw Error("탭은 최대 40개입니다.");
 const ids=new Set<string>();
 for(const tab of tabs){
  if(!tab || !/^[a-f0-9-]{36}$/.test(tab.id)||ids.has(tab.id)||typeof tab.title!=="string"||!tab.title.trim()||tab.title.length>80||typeof tab.body!=="string"||tab.body.length>16000||typeof tab.alt!=="string"||tab.alt.length>200||typeof tab.image!=="string"||(tab.image && !/^\/api\/media\/[a-f0-9-]{36}$/.test(tab.image)))throw Error("탭 입력을 확인하세요.");
  if((tab.summary!==undefined&&(typeof tab.summary!=="string"||tab.summary.length>300)) || (tab.menu!==undefined&&typeof tab.menu!=="boolean") || (tab.placement!==undefined&&!["index","ocean"].includes(tab.placement)) || (tab.template!==undefined&&!["detail","wiki"].includes(tab.template)))throw Error("카드 설정을 확인하세요.");
  ids.add(tab.id);
 }
 return tabs;
}
