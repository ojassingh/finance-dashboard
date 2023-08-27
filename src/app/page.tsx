"use client";
import { Dashboard } from "@/components/Dashboard";
import { ModeToggle } from "@/components/Toggle";

export default function Home() {

  return (
    <main className="">
      <div className="fixed top-0 right-0 p-4 ">
        <ModeToggle />
      </div>
      <Dashboard/>
    </main>
  );
}
