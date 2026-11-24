export const periodDefaults:Record<string,string>={
 recruitStart:"2026-11-26T00:00",recruitEnd:"2027-01-04T22:00",
 serverStart:"2027-01-10T00:00",serverEnd:"2027-01-25T00:00",
};
export function validPeriodDate(value:string){
 if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value))return false;
 const date=new Date(value+"Z");
 return Number.isFinite(date.getTime()) && date.toISOString().slice(0,16)===value;
}
