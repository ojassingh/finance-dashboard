'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import axios from 'axios';
import SpotifyLoginButton from '@/components/SpotifyLoginButton';
import { useRouter } from 'next/navigation';


export default function Home() {


  const router = useRouter()

  // router.push('/callback')

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">
        Spotify web app
      </h1>


      <SpotifyLoginButton/>
      
    </main>
  )
}
