"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function JobsToolbar({
    search,
    setSearch,
    status,
    setStatus,
    workMode,
    setWorkMode,
}) {
    return (
        <div className="rounded-2xl border bg-white p-5">

            <div className="grid gap-4 lg:grid-cols-4">

                {/* Search */}

                <div className="relative lg:col-span-2">

                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search jobs..."
                        className="pl-10"
                    />

                </div>

                {/* Status */}
                <Select
                    value={status}
                    onValueChange={setStatus}
                >

                    <SelectTrigger>

                        <SelectValue placeholder="Status" />

                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All Status
                        </SelectItem>

                        <SelectItem value="open">
                            Open
                        </SelectItem>

                        <SelectItem value="closed">
                            Closed
                        </SelectItem>

                    </SelectContent>

                </Select>

                {/* Work Mode */}

                <Select>

                    <SelectTrigger>

                        <SelectValue placeholder="Work Mode" />

                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All Modes
                        </SelectItem>

                        <SelectItem value="remote">
                            Remote
                        </SelectItem>

                        <SelectItem value="hybrid">
                            Hybrid
                        </SelectItem>

                        <SelectItem value="onsite">
                            Onsite
                        </SelectItem>

                    </SelectContent>

                </Select>

            </div>

        </div>
    );
}