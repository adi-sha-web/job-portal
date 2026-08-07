import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {

    return (

        <section className="relative overflow-hidden py-24  bg-gradient-to-r from-indigo-100 to-white">

            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-4xl text-center">

                    <p className="mb-6 inline-flex rounded-full border bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">

                        🚀 Find Your Dream Job Faster

                    </p>

                    <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">

                        Build Your

                        <span className="text-indigo-600">
                            {" "}Career{" "}
                        </span>

                        With Confidence

                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">

                        Discover thousands of opportunities from top companies,
                        apply in one click, and manage your career in one place.

                    </p>

                    <div className="mx-auto mt-12 flex max-w-2xl gap-3">

                        <div className="relative flex-1">

                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

                            <Input
                                placeholder="Search jobs..."
                                className="h-12 pl-11"
                            />

                        </div>

                        <Button
                            size="lg"
                            asChild
                        >

                            <Link href="/jobs">

                                Find Jobs

                                <ArrowRight className="ml-2 h-5 w-5" />

                            </Link>

                        </Button>

                    </div>

                    <div className="mt-14 flex justify-center gap-10">

                        <div>

                            <h2 className="text-4xl font-bold">
                                500+
                            </h2>

                            <p className="text-muted-foreground">
                                Jobs
                            </p>

                        </div>

                        <div>

                            <h2 className="text-4xl font-bold">
                                100+
                            </h2>

                            <p className="text-muted-foreground">
                                Companies
                            </p>

                        </div>

                        <div>

                            <h2 className="text-4xl font-bold">
                                2K+
                            </h2>

                            <p className="text-muted-foreground">
                                Candidates
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}