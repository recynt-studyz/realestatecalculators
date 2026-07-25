import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Real Estate Calculators 2026 — Free Property & Mortgage Tools',
  description:
    'Free mortgage, affordability, rent vs buy, closing costs, investment ROI, cap rate, fix & flip, and property tax calculators. All 50 states. 2026 rates.',
  keywords: [
    'mortgage calculator',
    'home affordability calculator',
    'rent vs buy calculator',
    'closing costs calculator',
    'investment property calculator',
    'cap rate calculator',
    'fix and flip calculator',
    'cash on cash calculator',
    'mortgage payoff calculator',
    'property tax calculator',
    'real estate calculator 2026',
  ],
  metadataBase: new URL('https://realestatecalculators.app'),
  alternates: { canonical: 'https://realestatecalculators.app' },
  openGraph: {
    title: 'Real Estate Calculators 2026 — Free Property & Mortgage Tools',
    description:
      'Free real estate calculators for mortgage payments, home affordability, rent vs buy, closing costs, investment ROI, fix and flip, cap rate, cash on cash, mortgage payoff and property tax.',
    url: 'https://realestatecalculators.app',
    siteName: 'realestatecalculators.app',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Real Estate Calculators 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Calculators 2026 — Free Property & Mortgage Tools',
    description:
      'Free real estate calculators for mortgage, affordability, rent vs buy, investment ROI and all 50 states. 2026 data.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5035661017594256" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('rec-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PYCTTNHHFW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PYCTTNHHFW');
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5035661017594256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
