import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'BolPay — Say and just pay', description: 'A voice-first udhaar ledger for kirana shopkeepers.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f97316', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
