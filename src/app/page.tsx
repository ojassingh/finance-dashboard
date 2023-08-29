"use client";
import { Dashboard } from "@/components/Dashboard";
import { ModeToggle } from "@/components/Toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex place-content-between gap-4 p-4 px-20">
        <div className="text-2xl font-bold">Finance Dashboard</div>
        <div className="flex gap-4">
          <Button variant="outline" className="">
            <Link className="" href="/login">
              Login
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      <div className="grid place-content-center">
        <Dashboard />
      </div>
    </main>
  );
}
