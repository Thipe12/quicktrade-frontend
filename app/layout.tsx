// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://quicktrade.co.ls'),
  title: 'QuickTrade - AI-Powered Marketplace in Lesotho',
  description: 'AI-powered second-hand marketplace connecting buyers and sellers in Lesotho. Get price predictions, demand insights, and fraud protection.',
  keywords: 'marketplace, second-hand, AI, Lesotho, buy, sell, electronics, furniture',
  authors: [{ name: 'QuickTrade Team' }],
  openGraph: {
    title: 'QuickTrade - AI-Powered Marketplace',
    description: 'Buy and sell smarter with AI in Lesotho',
    url: 'https://quicktrade.co.ls',
    siteName: 'QuickTrade',
    images: [
      {
        url: 'https://quicktrade.co.ls/og-image.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_LS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickTrade - AI-Powered Marketplace',
    description: 'Buy and sell smarter with AI in Lesotho',
    images: ['https://quicktrade.co.ls/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
