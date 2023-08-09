'use client'

import { SessionProvider } from 'next-auth/react'
import { signIn, signOut, useSession } from 'next-auth/react';
import Dashboard from '@/components/Dashboard';
import { ModeToggle } from '@/components/Toggle';

export default function Home() {

  // const { data: session } = useSession();

  return (
        <main className="grid place-content-center min-h-screen">

          <div className='my-auto'>
          <ModeToggle/>
          <Dashboard/>
          {/* <Combobox props='' /> */}
          </div>
          
        </main>
  )
}
