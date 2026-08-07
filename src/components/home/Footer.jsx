import Link from "next/link";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BriefcaseBusiness } from "lucide-react";
export default function Footer() {

    return (

        <footer className="border-t bg-slate-950 text-white">

            <div className="mx-auto max-w-7xl px-6 py-16">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Logo */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">

                                <BriefcaseBusiness className="h-6 w-6" />

                            </div>

                            <h2 className="text-2xl font-bold">

                                JobPortal

                            </h2>

                        </div>

                        <p className="mt-6 leading-7 text-slate-400">

                            Find your dream job, connect with top recruiters,
                            and build your career with confidence.

                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-lg font-semibold">

                            Quick Links

                        </h3>

                        <div className="mt-5 flex flex-col gap-3">

                            <Link
                                href="/"
                                className="text-slate-400 transition hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                href="/candidate/jobs"
                                className="text-slate-400 transition hover:text-white"
                            >
                                Jobs
                            </Link>

                            <Link
                                href="/login"
                                className="text-slate-400 transition hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="text-slate-400 transition hover:text-white"
                            >
                                Register
                            </Link>

                        </div>

                    </div>

                    {/* Recruiters */}

                    <div>

                        <h3 className="text-lg font-semibold">

                            Recruiters

                        </h3>

                        <div className="mt-5 flex flex-col gap-3">

                            <Link
                                href="/recruiter/dashboard"
                                className="text-slate-400 transition hover:text-white"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/recruiter/jobs"
                                className="text-slate-400 transition hover:text-white"
                            >
                                Manage Jobs
                            </Link>

                            <Link
                                href="/recruiter/company"
                                className="text-slate-400 transition hover:text-white"
                            >
                                Company
                            </Link>

                        </div>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="text-lg font-semibold">

                            Connect

                        </h3>

                        <div className="mt-5 flex gap-4">

                            <a
                                href="#"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-600"
                            >
                                <FaGithub className="h-5 w-5" />
                            </a>

                            <a
                                href="#"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-600"
                            >
                                <FaLinkedin className="h-5 w-5" />
                            </a>

                            <a
                                href="#"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-600"
                            >
                                <FaTwitter className="h-5 w-5" />
                            </a>

                        </div>

                    </div>

                </div>

                <div className="mt-14 border-t border-slate-800 pt-8">

                    <p className="text-center text-sm text-slate-500">

                        © {new Date().getFullYear()} JobPortal. All rights reserved.

                    </p>

                </div>

            </div>

        </footer>

    );

}