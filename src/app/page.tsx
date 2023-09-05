"use client";
import { Dashboard } from "@/components/Dashboard";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    // <SessionProvider>
      <main className="">
      <Navbar />
      <div className="grid place-content-center">
        <Dashboard />
      </div>
    </main>
    // </SessionProvider>
  );
}
