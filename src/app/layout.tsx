"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
        {/* <ThemeProvider> */}
          <body className={inter.className}><Providers>{children}</Providers></body>
        {/* </ThemeProvider> */}
    </html>
  )
}
