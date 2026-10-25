// Stand-in for the real Drunix network; swap with a gateway client later.
export type LedgerEntry = { id:string; customer:string; amount:number; status:'PENDING_CUSTOMER'|'ATTESTED'|'PARTIALLY_PAID'|'CLEARED'|'DISPUTED'; hash:string; createdAt:string }
const key='bolpay-ledger-v1'
async function digest(value:string) { const data=new TextEncoder().encode(value); const hash=await crypto.subtle.digest('SHA-256', data); return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('') }
export async function submitEntry(entry: Omit<LedgerEntry,'hash'>) { const previous=typeof window!=='undefined'?localStorage.getItem(key)||'genesis':''; const hash=await digest(previous+JSON.stringify(entry)); const saved={...entry,hash}; if(typeof window!=='undefined') localStorage.setItem(key, JSON.stringify(saved)); return saved }
export async function attestEntry(id:string) { return { id, status:'ATTESTED' as const } }
export async function recordRepayment(id:string, amount:number) { return { id, amount, status:'PARTIALLY_PAID' as const } }
export function getEntryStatus(id:string) { return 'ATTESTED' }
export function grantConsent(id:string) { return { id, consent:true, tier:'T1' } }
export function revokeConsent(id:string) { return { id, consent:false } }
export function getAttestedTier(id:string) { return 'T1' }
