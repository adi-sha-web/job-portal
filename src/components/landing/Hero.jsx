import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">

            {/* Background */}

            <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-50 via-white to-slate-100" />

            <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

                {/* LEFT */}


                <div>
                    <span className="inline-flex rounded-full border bg-white px-4 py-1 text-sm font-medium shadow-sm">
                        🚀 India's Modern Job Portal
                    </span>

                    <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight">

                        Find the

                        <span className="block text-indigo-600">
                            Career
                        </span>

                        You've Been Looking For.

                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">

                        Discover internships, remote jobs,
                        and full-time opportunities from startups
                        and top companies.

                        <div className="mt-10 flex rounded-2xl border bg-white p-2 shadow-xl">
                            <Input
                                placeholder="Search jobs..."
                                className="border-0 shadow-none"
                            />

                            <Button size="lg">

                                <Search className="mr-2 h-4 w-4" />

                                Search

                            </Button>

                        </div>

                    </p>
                </div>

                {/* RIGHT */}

                <div className="hidden lg:flex items-center justify-center">

                </div>

            </div>

        </section>
    );
}