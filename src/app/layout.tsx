"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Providers } from './providers'
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <SessionProvider>
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          {/* <UserProvider> */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            
              {children}
            <Toaster />
          </NextAuthProvider>
          </ThemeProvider>
          {/* </UserProvider> */}
        </body>
      </html>
    </>
    // </SessionProvider>
  );
}
