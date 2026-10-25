import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'BolPay — Say and just pay', description: 'A voice-first udhaar ledger for kirana shopkeepers.', generator: 'v0.app', icons: { icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BolPay-FS60Kgd6xXRNnlYEc4Jy4YX1Pg2EDW.png', apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BolPay-FS60Kgd6xXRNnlYEc4Jy4YX1Pg2EDW.png' } }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f97316', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
