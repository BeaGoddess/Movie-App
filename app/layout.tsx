import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ReduxProvider } from '@/store/provider'

const font = Open_Sans({ subsets: ['latin'] })
import HomePage from "@/components/HomePage"

export const metadata: Metadata = {
  title: 'Movie App',
  description: 'Search and add Movies to a list',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href='/favicon.ico' sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={cn(
        font.className
      )}>
        <div className="relative bg-black h-screen w-full flex flex-grow flex-col justify-center items-center">
          <HomePage />
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  )
}
