"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    BriefcaseBusiness,
    FileText,
    User,
    LogOut,
} from "lucide-react";

import Logo from "@/components/layout/Logo";

export const menuItems = [
    {
        title: "Dashboard",
        href: "/candidate/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Browse Jobs",
        href: "/candidate/jobs",
        icon: BriefcaseBusiness,
    },
    {
        title: "My Applications",
        href: "/candidate/my-applications",
        icon: FileText,
    },
    {
        title: "Profile",
        href: "/candidate/profile",
        icon: User,
    },
];

export default function CandidateSidebar() {

    const pathname = usePathname();

    return (

        <aside className="hidden w-72 border-r bg-white lg:flex lg:flex-col">

            <div className="border-b p-3.5">

                <Logo />

            </div>

            <nav className="flex-1 space-y-2 p-4">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    const active = pathname === item.href ||
                        (item.href !== "/candidate/dashboard" &&
                            pathname.startsWith(item.href) || pathname.endsWith(item.href));

                    return (

                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                            ${
                                active
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-700 hover:bg-slate-100"
                            }`}
                        >

                            <Icon className="h-5 w-5" />

                            <span>{item.title}</span>

                        </Link>

                    );

                })}

            </nav>

            <div className="border-t p-4">

                <button
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
                >

                    <LogOut className="h-5 w-5" />

                    Logout

                </button>

            </div>

        </aside>

    );

}