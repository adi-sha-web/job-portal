"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-red-50 hover:text-red-600"
        >
            <LogOut className="h-5 w-5" />

            <span>Logout</span>
        </button>
    );
}