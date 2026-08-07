"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import JobHero from "@/components/job-details/JobHero";
import JobDescription from "@/components/job-details/JobDescription";
import JobSkills from "@/components/job-details/JobSkills";
import CompanyCard from "@/components/job-details/CompanyCard";
import JobMeta from "@/components/job-details/JobMeta";

export default function JobDetailsPage() {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {
        fetchJob();
    }, []);

    async function fetchJob() {

        try {

            const res = await fetch(`/api/jobs/${id}`);

            const data = await res.json();

            if (data.success) {
                setJob(data.job);
            }

        } catch (error) {
            console.error(error);
        }

    }

    if (!job) {
        return (
            <div className="flex justify-center py-20">
                Loading...
            </div>
        );
    }

    return (

        <div className="mx-auto max-w-7xl space-y-8 p-6">

            <JobHero job={job} />

            <div className="grid gap-8 lg:grid-cols-3">

                <div className="space-y-8 lg:col-span-2">

                    <JobDescription job={job} />

                    <JobSkills job={job} />

                </div>

                <div className="space-y-8">

                    <CompanyCard job={job} />

                    <JobMeta job={job} />

                </div>

            </div>

        </div>

    );

}