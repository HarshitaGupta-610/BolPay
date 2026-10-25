'use client'

import Link from 'next/link'
import { ArrowLeft, Target, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-izk7EDbwsV8iDayiGaxWkl23U1LRAC.png'

const targets = [
  ['Voice entry accuracy', '90%+', 'after customer confirmation'],
  ['Entry time', '<10 sec', 'from voice to shared proof'],
  ['Reduced disputes', 'Target', 'placeholder for measured change'],
  ['Dues recovered', 'Target', 'through friendly reminders'],
  ['New digital histories', 'Target', 'customers building a record'],
]
function Counter({ value }: { value: string }) { const [shown, setShown] = useState('0'); useEffect(() => { let i = 0; const timer = window.setInterval(() => { i += 1; setShown(value.includes('%') ? `${Math.min(90, i * 5)}%+` : value.includes('sec') ? `<${Math.max(10, 60 - i * 5)} sec` : i > 10 ? value : 'Target'); if (i >= 18) window.clearInterval(timer) }, 55); return () => window.clearInterval(timer) }, [value]); return <span>{shown}</span> }
export default function ImpactPage() { return <main className="min-h-screen bg-[#fffaf6] text-[#2b1b0e]"><header className="border-b border-orange-100 bg-white px-5 py-4"><div className="mx-auto flex max-w-6xl items-center justify-between"><Link href="/app" className="font-bold text-[#c2410c]"><ArrowLeft className="mr-2 inline size-4" />Back to app</Link><Link href="/" className="flex items-center gap-2 font-bold"><img src={logo} alt="BolPay" className="size-8 rounded-lg object-cover" />BolPay</Link></div></header><div className="mx-auto max-w-6xl px-5 py-12"><div className="max-w-2xl"><p className="font-bold uppercase tracking-[.25em] text-[#e85d04]">Measure what matters</p><h1 className="mt-3 text-5xl font-bold leading-tight">Small shop records. Bigger possibilities.</h1><p className="mt-4 text-lg text-[#6f4b32]">These are product targets for a clearer, more trusted udhaar economy. We label them targets until real-world results are measured.</p></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{targets.map(([label, value, detail]) => <article key={label} className="rounded-[1.75rem] border border-orange-100 bg-white p-6 shadow-lg shadow-orange-100/50"><div className="flex items-center justify-between"><Target className="text-[#e85d04]" /><span className="rounded-full bg-[#fff0df] px-3 py-1 text-xs font-bold text-[#c2410c]">Target</span></div><p className="mt-8 text-sm font-bold uppercase tracking-wider text-[#8a6548]">{label}</p><p className="mt-2 text-4xl font-bold text-[#e85d04]"><Counter value={value} /></p><p className="mt-2 text-[#6f4b32]">{detail}</p></article>)}</div><div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#2b1b0e] p-5 text-white"><TrendingUp className="text-[#ffb267]" /><p><b>Target, not a promise.</b> BolPay will publish measured outcomes as the network grows.</p></div></div></main> }
