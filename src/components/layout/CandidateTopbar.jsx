"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Bell, Search } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    menuItems,
} from "./CandidateSidebar";

import Logo from "./Logo";

import { usePathname } from "next/navigation";

export default function CandidateTopbar({ session }) {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-40 border-b bg-white">

            <div className="flex h-18 items-center justify-between px-6">

                {/* Mobile */}

                <div className="lg:hidden">

                    <Sheet>

                        <SheetTrigger asChild>

                            <Button
                                variant="ghost"
                                size="icon"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>

                        </SheetTrigger>

                        <SheetContent
                            side="left"
                            className="w-72 p-0"
                        >

                            <div className="border-b p-6">

                                <Logo />

                            </div>

                            <nav className="space-y-2 p-4">

                                {menuItems.map((item) => {

                                    const Icon = item.icon;

                                    const active =
                                        pathname === item.href;

                                    return (

                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active
                                                    ? "bg-indigo-600 text-white"
                                                    : "hover:bg-slate-100"
                                                }`}
                                        >

                                            <Icon className="h-5 w-5" />

                                            {item.title}

                                        </Link>

                                    );

                                })}

                            </nav>

                        </SheetContent>

                    </Sheet>

                </div>

                {/* Desktop  */}

                

                <div className="ml-auto flex items-center gap-4">

                    

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">

                        {session?.user?.name?.charAt(1).toUpperCase() || "U"}

                    </div>

                </div>

            </div>

        </header>
    );
}