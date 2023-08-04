'use client'

import { SessionProvider } from 'next-auth/react'
import { signIn, signOut, useSession } from 'next-auth/react';
import Dashboard from '@/components/Dashboard';


export default function Home() {

  // const { data: session } = useSession();

  return (
        <main className="grid place-content-center min-h-screen">

          <div className='my-auto'>
          <Dashboard/>
          </div>
          
        </main>
  )
}
