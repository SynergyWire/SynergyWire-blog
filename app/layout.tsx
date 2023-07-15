import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import '../styles/globals.css'


export const metadata: Metadata = {
  title: "Luis Santiago's Blog",
  description: 'dedicated blog to talk about topics related to: tecnology, software development, frontend, backend, clean code, data structure, design patterns and also other topics more close to the life :)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Luis Santiago&apos;s Blog</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/next.svg" />
      </Head>
      <body>
      <Header />
        <div className="mx-auto max-w-3xl min-h-screen px-6 pt-6 flex flex-col">

          <div className="py-6">
            {children}
          </div>
          <Footer />
        </div>
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
