export async function getLiveInfo(stationUrl:string) {
 const unknown={state:"unknown",profile:"",title:"",preview:""};
 try {
  const station=new URL(stationUrl);
  const id=station.pathname.match(/^\/station\/([a-z0-9_]+)\/?$/i)?.[1];
  if(!id || !["sooplive.com","www.sooplive.com"].includes(station.hostname))return unknown;
  const response=await fetch("https://chapi.sooplive.com/api/"+id+"/station",{signal:AbortSignal.timeout(4500)});
  if(!response.ok)return unknown;
  const data=await response.json();
  if(!data.station || !("broad" in data))return unknown;
  const avatar=new URL(data.profile_image || "/", "https://profile.img.sooplive.com");
  const profile=avatar.pathname!=="/" && avatar.protocol==="https:" && /^profile\.img\.sooplive\.(com|co\.kr)$/.test(avatar.hostname)?avatar.href:"";
  const b=data.broad;
  const live=!!b?.broad_no;
  const visible=live && !Number(b.broad_grade) && !Number(b.subscription_only) && !Number(b.is_password) && b.is_password!=="Y";
  return {state:live?"live":"offline",profile,title:live?String(b.broad_title||""):"",preview:visible?"https://liveimg.sooplive.com/m/"+encodeURIComponent(b.broad_no)+"?t="+Math.floor(Date.now()/60000):""};
 }catch{return unknown;}
}
