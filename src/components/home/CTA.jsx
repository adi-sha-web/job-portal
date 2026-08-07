import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTA() {

    return (

        <section className="py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 p-12 text-center text-white shadow-2xl">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">

                        Start Your Journey

                    </p>

                    <h2 className="mt-4 text-4xl font-bold lg:text-5xl">

                        Ready to Find Your Dream Job?

                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">

                        Join thousands of candidates and recruiters using our
                        platform to build successful careers and hire top talent.

                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                        >

                            <Link href="/jobs">

                                Browse Jobs

                                <ArrowRight className="ml-2 h-5 w-5" />

                            </Link>

                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white bg-transparent text-white hover:bg-white hover:text-indigo-700"
                        >

                            <Link href="/register">

                                Create Account

                            </Link>

                        </Button>

                    </div>

                </div>

            </div>

        </section>

    );

}