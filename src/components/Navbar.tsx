import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ModeToggle } from "./Toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (status == "authenticated") {
      setAuth(true);
    }
    console.log(status)
  }, []);

  return (
    <div className="flex gap-10 place-content-around">
      <div className="flex place-content-between gap-4 p-4">
        <div className="text-2xl font-bold">Finance Dashboard</div>
        <div className="text-md text-gray-500 font-medium">
          A simple analytics app powered by Next.js, Prisma, MySQL, and GPT-3.5
        </div>
        {!auth && (
          <Button
            onClick={() => {
              signIn();
            }}
            variant="outline"
            className=""
          >
            Login
          </Button>
        )}
        {auth && (
          <Button variant="outline" className="">
            <Link className="" href="/profile">
              Profile
            </Link>
          </Button>
        )}
        {auth && (
          <Button
            onClick={() => {
              signOut();
            }}
            variant="outline"
            className=""
          >
            Logout
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
