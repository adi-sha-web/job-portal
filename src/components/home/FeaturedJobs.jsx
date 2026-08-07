"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BriefcaseBusiness } from "lucide-react";

import HomeJobCard from "./HomeJobCard";

export default function FeaturedJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    async function fetchJobs() {

        try {

            const res = await fetch("/api/jobs/featured");
       
            const data = await res.json();

            if (data.success) {
                setJobs(data.jobs);
            }

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <section className="py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="font-semibold text-indigo-600">
                            Latest Opportunities
                        </p>

                        <h2 className="mt-2 text-4xl font-bold">
                            Featured Jobs
                        </h2>

                    </div>

                    <Button
                        asChild
                        variant="outline"
                    >

                        <Link href="/jobs">

                            View All Jobs

                        </Link>

                    </Button>

                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {jobs.map((job) => (

                        <HomeJobCard
                            key={job._id}
                            job={job}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

}