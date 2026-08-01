"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    BriefcaseBusiness,
    Building2,
    Users,
    PlusCircle,
    LogOut,
} from "lucide-react";

import Logo from "./Logo";
import LogoutButton from "../LogoutButton";

const menuItems = [
    {
        title: "Dashboard",
        href: "/recruiter/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Jobs",
        href: "/recruiter/jobs",
        icon: BriefcaseBusiness,
    },
    {
        title: "Company",
        href: "/recruiter/company",
        icon: Building2,
    },
    {
        title: "Applicants",
        href: "/recruiter/applicants",
        icon: Users, 
    },
    {
        title: "Create Job",
        href: "/recruiter/create",
        icon: PlusCircle,
    },
];

export default function RecruiterSidebar() {

    const pathname = usePathname();

    return (

        <aside className="flex h-screen w-64 flex-col border-r bg-white">

            {/* Logo */}

            <div className="border-b p-6">

                <Logo />

            </div>

            {/* Menu */}

            <nav className="flex-1 space-y-2 p-4">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    const active =
                        pathname === item.href ||
                        (item.href !== "/recruiter/dashboard" &&
                            pathname.startsWith(item.href));

                    return (

                        <Link
                            key={item.title}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                            
                            ${active
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-slate-100 text-slate-700"
                                }
                            
                            `}
                        >

                            <Icon className="h-5 w-5" />

                            <span>

                                {item.title}

                            </span>

                        </Link>

                    );

                })}

            </nav>

            {/* Logout */}

            <div className="border-t p-4">

                <LogoutButton />

            </div>

        </aside>

    );

}