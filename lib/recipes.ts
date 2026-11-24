export type Recipe = {name:string, materials:string, method:string};
export function readRecipes(raw?:string):Recipe[] {
 const rows:unknown=JSON.parse(raw||"[]");
 if(!Array.isArray(rows)||rows.length>150)throw Error("조합법은 최대 150개까지 등록할 수 있습니다.");
 for(const row of rows){
   if(!row || typeof row.name!=="string" || !row.name.trim() || row.name.length>100 || typeof row.materials!=="string" || !row.materials.trim() || row.materials.length>2000 || typeof row.method!=="string" || row.method.length>3000)throw Error("요리 이름과 재료·수량을 확인하세요.");
 }
 return rows;
}
