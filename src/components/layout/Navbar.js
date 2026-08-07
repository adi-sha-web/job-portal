"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import Logo from "./Logo";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";



export default function Navbar({ session }) {
  const pathname = usePathname()

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";



  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">

      <div className="flex h-20 w-full max-w-7xl items-center justify-between px-6 mx-auto">

        <Logo />

        {/* Desktop */}

        

        {/* Desktop Buttons */}

        <div className="hidden items-center gap-3  md:flex ">

          {session ? (
            <>
              <DropdownMenu>

                <DropdownMenuTrigger>

                  <Avatar className="cursor-pointer">

                    <AvatarFallback>
                      {initials}
                    </AvatarFallback>

                  </Avatar>

                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">

                  <DropdownMenuItem>
                    <Link href={`/${session.user.role}/dashboard`}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut className="h-5 w-5" />

                      <span>Logout</span>
                    </button>
                  </DropdownMenuItem>

                </DropdownMenuContent>

              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                Login
              </Link>

              <Link href="/register" className="text-sm font-medium bg-black text-white hover:text-indigo-600 border-2 border-slate-300 rounded-md px-4 py-2 hover:bg-white hover:border-black ">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}

        <div className="md:hidden">

          <Sheet>

            <SheetTrigger asChild>

              <Button
                size="icon"
                variant="ghost"
              >
                <Menu className="h-6 w-6" />
              </Button>

            </SheetTrigger>

            <SheetContent side="right">

              <div className="mt-10 flex flex-col gap-5 px-5">

                {session ? (
                  <>
                    <Link href={`/${session.user.role}/dashboard`}>
                      Dashboard
                    </Link>
                    -------------------------------------------------------------------------
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut className="h-5 w-5" />

                      <span>Logout</span>
                    </button>


                  </>
                ) : (
                  <>
                    <Link href="/login">
                      Login
                    </Link>

                    <Link href="/register">
                      Register
                    </Link>
                  </>
                )}

              </div>

            </SheetContent>

          </Sheet>

        </div>

      </div>

    </header>

  );
}