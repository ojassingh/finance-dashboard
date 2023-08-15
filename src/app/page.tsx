'use client'
import { ModeToggle } from '@/components/Toggle';
import { ComboboxForm } from '@/components/Combobox';

export default function Home() {


  return (
        <main className="grid place-content-center min-h-screen">

          <div className='my-auto'>
            <ModeToggle/>
            <ComboboxForm/>
            {/* <Dashboard/> */}
          </div>
          
        </main>
  )
}
