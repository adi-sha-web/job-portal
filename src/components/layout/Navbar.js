"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import Logo from "./Logo";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Companies",
    href: "/companies",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">

      <div className="flex h-20 w-full max-w-7xl items-center justify-between px-6 mx-auto">

        <Logo />

        {/* Desktop */}

        <nav className="hidden items-center gap-8 md:flex">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-indigo-600"
                  : "text-slate-600 hover:text-indigo-600"
              }`}
            >
              {link.name}
            </Link>
          ))}

        </nav>

        {/* Desktop Buttons */}

        <div className="hidden items-center gap-3 md:flex">

          <Link href="/login">
            <Button variant="ghost">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button>
              Register
            </Button>
          </Link>

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

              <div className="mt-10 flex flex-col gap-5">

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.name}
                  </Link>
                ))}

                <Separator />

                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button className="w-full">
                    Register
                  </Button>
                </Link>

              </div>

            </SheetContent>

          </Sheet>

        </div>

      </div>

    </header>
    
  );
}