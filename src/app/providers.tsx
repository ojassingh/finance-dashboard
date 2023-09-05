// app/providers.jsx

'use client'

import { ThemeProvider } from 'next-themes'
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export function NextAuthProvider({ children }: Props) {
  return <SessionProvider><ThemeProvider>{children}</ThemeProvider></SessionProvider>
}