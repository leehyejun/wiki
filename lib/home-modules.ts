export const modules = {
  concept: "활동과 졸업 목표",
  people: "참가자",
  rules: "서버 규칙",
  patches: "패치노트",
  cooking: "조합법",
  rewards: "방송인 API 안내",
};
export type ModuleId = keyof typeof modules;
export const defaultModules: ModuleId[] = ["concept", "people", "rules"];
export function parseModules(raw: string): ModuleId[] {
  const ids: unknown = JSON.parse(raw);
  if (!Array.isArray(ids) || ids.some(id => typeof id !== "string" || !Object.hasOwn(modules,id)) || new Set(ids).size !== ids.length) {
    throw Error("홈 구성 형식 오류");
  }
  return ids as ModuleId[];
}

