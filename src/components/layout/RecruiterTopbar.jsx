"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function RecruiterTopbar({ user }) {

    const initials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase() || "U";

    return (
        <header className="flex h-20 items-center justify-between border-b bg-white px-8">

            {/* Search */}

            <div className="relative w-full max-w-md">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Search jobs..."
                    className="pl-10"
                />

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-4">

                <button className="rounded-xl border p-2 hover:bg-slate-100 transition">

                    <Bell className="h-5 w-5" />

                </button>

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
                            Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            Logout
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            </div>

        </header>
    );
}