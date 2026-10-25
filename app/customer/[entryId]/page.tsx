'use client'

import Link from 'next/link'
import { Check, Clock3, Copy, LockKeyhole, ShieldCheck, Volume2, X } from 'lucide-react'
import { useState } from 'react'
import { demoProfile } from '@/src/lib/passport'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BolPay-FS60Kgd6xXRNnlYEc4Jy4YX1Pg2EDW.png'

export default function CustomerPage() {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'disputed'>('pending')
  const [consent, setConsent] = useState(false)
  const [expiry, setExpiry] = useState('6 months')
  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
  }
  const confirm = () => {
    setStatus('confirmed')
    speak('Dhanyavaad. Aapki confirmation record ho gayi hai.')
  }
  return <main className="min-h-screen bg-[#fff6ec] px-5 py-10 text-[#2b1b0e]">
    <div className="mx-auto w-full max-w-2xl">
      <Link href="/app" className="mb-8 flex items-center gap-2 text-sm font-bold text-[#c2410c]"><img src={logo} alt="BolPay" className="size-8 rounded-lg object-cover" />Back to Ramesh Kirana</Link>
      <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-orange-100 md:p-10">
        {status === 'confirmed' ? <div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#ffe8d1] text-[#e85d04]"><ShieldCheck className="size-8" /></div><h1 className="mt-6 text-4xl font-bold">Thank you.</h1><p className="mt-3 text-lg text-[#6f4b32]">Your confirmation is recorded. Both sides now have shared proof.</p><button onClick={() => setStatus('pending')} className="mt-6 rounded-xl border border-orange-200 px-5 py-3 font-bold text-[#c2410c]">Review again</button></div> : status === 'disputed' ? <div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#fff0df] text-[#c2410c]"><X className="size-8" /></div><h1 className="mt-6 text-3xl font-bold">Dispute recorded</h1><p className="mt-3 text-lg text-[#6f4b32]">The shopkeeper can review this entry before it is added to your history.</p><button onClick={() => setStatus('pending')} className="mt-6 rounded-xl bg-[#e85d04] px-5 py-3 font-bold text-white">Go back</button></div> : <><p className="text-center text-sm uppercase tracking-wider text-[#e85d04]">Please confirm this entry</p><h1 className="mt-4 text-center text-3xl font-bold leading-tight">Ramesh Kirana says you took ₹150 udhaar.</h1><p className="mt-4 text-center text-lg text-[#6f4b32]">Aapne Ramesh Kirana se ₹150 ka udhaar liya hai. Kya yeh sahi hai?</p><button onClick={() => speak('Aapne Ramesh Kirana se 150 rupaye ka udhaar liya hai.')} className="mx-auto mt-5 flex items-center gap-2 text-sm text-[#c2410c]"><Volume2 className="size-4" />Listen in Hindi</button><div className="mt-8 grid grid-cols-2 gap-3"><button type="button" onClick={confirm} className="rounded-2xl bg-[#e85d04] py-4 text-lg font-bold text-white"><Check className="mr-2 inline" />Yes, confirm</button><button type="button" onClick={() => setStatus('disputed')} className="rounded-2xl border-2 border-orange-200 py-4 text-lg font-bold text-[#c2410c]"><X className="mr-2 inline" />No, dispute</button></div></>}
        <section className="mt-10 border-t border-orange-100 pt-8"><div className="flex items-center justify-between"><div><p className="text-sm uppercase tracking-wider text-[#e85d04]">Udhaar Passport</p><h2 className="mt-1 text-2xl font-bold">{demoProfile.tier}</h2></div><div className="grid size-20 place-items-center rounded-full border-8 border-[#e85d04] text-2xl font-bold text-[#e85d04]">{demoProfile.score}</div></div><p className="mt-5 text-[#6f4b32]">Your score is based on on-time repayments, cleared entries, repayment speed, and history. Only a verified tier is shared with consent.</p></section>
        <section className="mt-8 rounded-2xl bg-[#fff6ec] p-5"><div className="flex items-start gap-3"><LockKeyhole className="mt-1 text-[#e85d04]" /><div className="flex-1"><h2 className="font-bold">Give lender access</h2><p className="mt-1 text-sm text-[#6f4b32]">Share only your verified tier and key bands. Raw entries stay private.</p><label className="mt-4 block text-sm font-bold">Access expires<select value={expiry} onChange={e => setExpiry(e.target.value)} className="mt-1 w-full rounded-xl border border-orange-200 bg-white px-3 py-3"><option>30 days</option><option>6 months</option><option>1 year</option></select></label><button onClick={() => setConsent(value => !value)} className={`mt-4 w-full rounded-xl py-3 font-bold ${consent ? 'bg-[#16803c] text-white' : 'bg-[#e85d04] text-white'}`}>{consent ? `Consent active · ${expiry}` : 'Grant consent'}</button>{consent && <button onClick={() => setConsent(false)} className="mt-2 w-full rounded-xl border border-orange-200 py-3 font-bold text-[#c2410c]">Revoke consent</button>}</div></div></section>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl border border-orange-100 p-3"><Clock3 className="mb-2 text-[#e85d04]" /><b>6 months</b><span className="block text-[#8a6548]">history</span></div><div className="rounded-xl border border-orange-100 p-3"><Copy className="mb-2 text-[#e85d04]" /><b>Consent-led</b><span className="block text-[#8a6548]">sharing</span></div></div>
      </div>
    </div>
  </main>
}
