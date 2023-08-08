import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: "SynergyWire Blog",
  description: 'A blog dedicated to web development and programming in general',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Header />
        <main className="mx-auto max-w-screen-xl min-h-screen px-6 pt-6 flex flex-col">
          <div className="py-6  flex justify-center">
            {children}
          </div>
          <Footer />
        </main>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`} />
        <Script
          id="google-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}')
            
            `
          }}
        />
      </body>
    </html>
  )
}
