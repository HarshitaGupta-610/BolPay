'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Check, CircleOff, Cloud, CloudOff, CreditCard, Mic, Network, Play, RefreshCw, Send, ShieldCheck, Volume2, Wifi } from 'lucide-react'
import { parseVoice, type ParsedIntent } from '@/src/lib/parser'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-izk7EDbwsV8iDayiGaxWkl23U1LRAC.png'
type Entry = { id: string; customer: string; amount: number; status: 'open' | 'partial' | 'cleared'; days: string }
const initialEntries: Entry[] = [
  { id: 'entry-001', customer: 'Ramesh Kumar', amount: 1250, status: 'open', days: '30+ days' },
  { id: 'entry-002', customer: 'Sita Sharma', amount: 850, status: 'open', days: '8–30 days' },
  { id: 'entry-003', customer: 'Asha Devi', amount: 420, status: 'open', days: '8–30 days' },
  { id: 'entry-004', customer: 'Fatima Begum', amount: 180, status: 'open', days: '0–7 days' },
]

export default function AppPage() {
  const [entries, setEntries] = useState(initialEntries)
  const [customer, setCustomer] = useState('Ramesh Kumar')
  const [amount, setAmount] = useState('150')
  const [offline, setOffline] = useState(false)
  const [queue, setQueue] = useState(false)
  const [payment, setPayment] = useState(false)
  const [input, setInput] = useState('')
  const [parsed, setParsed] = useState<ParsedIntent | null>(null)
  const [demoStep, setDemoStep] = useState(0)
  const openTotal = useMemo(() => entries.filter(e => e.status !== 'cleared').reduce((sum, e) => sum + e.amount, 0), [entries])

  function submitVoice() { setParsed(parseVoice(input, entries.map(e => e.customer))) }
  function simulatePayment() {
    const value = Math.max(0, Number(amount) || 0)
    if (!value) return
    if (offline) { setQueue(true); return }
    let remaining = value
    setEntries(current => current.map(entry => {
      if (remaining <= 0 || entry.status === 'cleared' || entry.customer !== customer) return entry
      const paid = Math.min(entry.amount, remaining); remaining -= paid
      return { ...entry, amount: entry.amount - paid, status: paid === entry.amount ? 'cleared' : 'partial' }
    }))
    setPayment(true); window.setTimeout(() => setPayment(false), 2600)
  }
  function reconnect() { setOffline(false); if (queue) { setQueue(false); setPayment(true); window.setTimeout(() => setPayment(false), 2600) } }
  const captions = ['Go offline — entries are safe on this device.', 'Speak an entry in Hindi or English.', 'Customer confirms on the second screen.', 'Simulate UPI — oldest open dues clear first.', 'Passport tier upgrades after repayment.', 'Lender verifies only with consent.', 'Drunix catches the tampering attempt.']

  return <main className="min-h-screen bg-[#fffaf6] text-[#2b1b0e]">
    {payment && <div className="fixed inset-0 z-50 grid place-items-center bg-[#2b1b0e]/30"><div className="animate-float rounded-[2rem] bg-white p-10 text-center shadow-2xl"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#e85d04] text-white"><Check className="size-10" /></div><h2 className="mt-5 text-3xl font-bold">Payment matched</h2><p className="mt-2 text-[#6f4b32]">UPI payment recorded and dues updated.</p><button onClick={() => setPayment(false)} className="mt-6 rounded-xl bg-[#e85d04] px-5 py-3 font-bold text-white">Continue</button></div></div>}
    <header className="border-b border-orange-100 bg-white px-5 py-3"><div className="mx-auto flex max-w-6xl items-center justify-between"><Link href="/" className="flex items-center gap-2 font-bold"><img src={logo} alt="BolPay" className="size-10 rounded-xl object-cover" /> BolPay</Link><nav className="flex items-center gap-3 text-sm font-bold text-[#c2410c]"><Link href="/customer/entry-001">Customer</Link><Link href="/lender">Lender</Link><Link href="/drunix">Drunix</Link><Link href="/impact">Impact</Link></nav></div></header>
    <div className="mx-auto max-w-6xl px-4 py-7"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-widest text-[#e85d04]">Ramesh Kirana Store</p><h1 className="text-4xl font-bold">Udhaar, made clear.</h1></div><div className="flex gap-2"><button onClick={() => demoStep < captions.length - 1 && setDemoStep(s => s + 1)} className="rounded-full bg-[#e85d04] px-4 py-2 font-bold text-white"><Play className="mr-2 inline size-4" />Guided demo</button><button onClick={offline ? reconnect : () => setOffline(true)} className="rounded-full border border-orange-200 bg-white px-4 py-2 font-bold text-[#c2410c]">{offline ? <><Wifi className="mr-2 inline size-4" />Back online</> : <><Wifi className="mr-2 inline size-4" />Go offline</>}</button></div></div>
      {demoStep > 0 && <div className="mb-6 flex items-center gap-3 rounded-2xl border border-orange-200 bg-[#fff0df] p-4 text-sm font-bold"><span className="grid size-8 place-items-center rounded-full bg-[#e85d04] text-white">{demoStep}</span>{captions[demoStep]}<button onClick={() => setDemoStep(0)} className="ml-auto text-[#c2410c]">Exit demo</button></div>}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"><section className="rounded-[2rem] bg-[#fff0df] p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-[#e85d04]">Voice entry</p><h2 className="mt-1 text-3xl font-bold">Say it, we&apos;ll record it.</h2></div><div className="grid size-14 place-items-center rounded-2xl bg-[#e85d04] text-white"><Mic /></div></div><div className="mt-7 flex gap-2"><input value={input} onChange={e => setInput(e.target.value)} placeholder="Try: Sita ko 150 udhaar" className="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3" /><button onClick={submitVoice} className="rounded-xl bg-[#e85d04] px-4 font-bold text-white">Parse</button></div>{parsed && <div className="mt-4 rounded-xl bg-white p-4"><b>{parsed.kind === 'entry' ? 'Ready to confirm' : 'Try a customer and amount'}</b><p className="mt-1 text-sm text-[#6f4b32]">{parsed.kind === 'entry' ? `${parsed.customer} · ₹${parsed.amount}` : 'Example: “Ramesh ko 250 udhaar”'}</p><Link href="/customer/entry-001" className="mt-3 inline-block font-bold text-[#c2410c]">Open customer confirmation →</Link></div>}<div className="mt-7 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-white p-3"><b>{entries.length}</b><span className="block text-[#8a6548]">entries</span></div><div className="rounded-xl bg-white p-3"><b>₹{openTotal.toLocaleString('en-IN')}</b><span className="block text-[#8a6548]">open dues</span></div></div></section>
      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-orange-100"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-[#e85d04]">Simulate UPI payment</p><h2 className="mt-1 text-3xl font-bold">Match oldest dues first.</h2></div><CreditCard className="text-[#e85d04]" /></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><label className="text-sm font-bold">Customer<select value={customer} onChange={e => setCustomer(e.target.value)} className="mt-1 w-full rounded-xl border border-orange-200 bg-white px-3 py-3"><option>Ramesh Kumar</option><option>Sita Sharma</option><option>Asha Devi</option><option>Fatima Begum</option></select></label><label className="text-sm font-bold">Amount<input value={amount} onChange={e => setAmount(e.target.value)} inputMode="numeric" className="mt-1 w-full rounded-xl border border-orange-200 px-3 py-3" /></label></div><button onClick={simulatePayment} className="mt-4 w-full rounded-xl bg-[#e85d04] py-3 font-bold text-white"><Send className="mr-2 inline size-4" />Simulate UPI payment</button>{queue && <div className="mt-3 rounded-xl bg-[#fff0df] p-3 text-sm font-bold text-[#c2410c]"><CloudOff className="mr-2 inline size-4" />Waiting to sync · payment queued locally</div>}<div className="mt-6 flex items-center justify-between border-t border-orange-100 pt-4 text-sm"><span>{offline ? <><CircleOff className="mr-1 inline size-4" />Offline mode</> : <><Cloud className="mr-1 inline size-4" />Online & synced</>}</span><span className="font-bold text-[#e85d04]">{entries.filter(e => e.status === 'cleared').length} cleared</span></div></section></div>
      <section className="mt-6 rounded-[2rem] bg-[#2b1b0e] p-6 text-white"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-widest text-[#ffb267]">Live ledger</p><h2 className="text-2xl font-bold">Every change has shared proof.</h2></div><Link href="/drunix" className="rounded-xl bg-[#e85d04] px-4 py-2 font-bold">Explore Drunix <Network className="ml-2 inline size-4" /></Link></div><div className="mt-5 grid gap-2 md:grid-cols-4">{entries.map(e => <div key={e.id} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"><div className="flex justify-between"><b>{e.customer}</b><span className={e.status === 'cleared' ? 'text-green-300' : 'text-[#ffb267]'}>{e.status}</span></div><p className="mt-1 text-white/60">{e.status === 'cleared' ? 'Payment complete' : `₹${e.amount} · ${e.days}`}</p></div>)}</div></section></div>
  </main>
}
