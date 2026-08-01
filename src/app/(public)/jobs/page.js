"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JobCard from "@/components/jobs/JobCard";
import JobsHeader from "@/components/jobs/JobsHeader"
import JobsToolbar from "@/components/jobs/JobsToolbar";
import JobsSummary from "@/components/jobs/JobsSummary";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await fetch("/api/jobs/public");
            const data = await res.json();

            if (data.success) {
                setJobs(data.jobs);
            }
        };

        fetchJobs();
    }, []);

    const totalJobs = jobs.length;

    const openJobs = jobs.filter(job => job.status === "Open").length;

    const closedJobs = jobs.filter(job => job.status === "Closed").length;

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("all");

    const [workMode, setWorkMode] = useState("all");

    const filteredJobs = jobs.filter((job) => {

        const matchesSearch =
            job.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            status === "all" ||
            job.status === status;

        const matchesWorkMode =
            workMode === "all" ||
            job.workMode === workMode;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesWorkMode
        );
    });

    return (
        <div className="max-w-7xl mx-auto p-6">

            <JobsHeader />

            <JobsSummary
                total={totalJobs}
                open={openJobs}
                closed={closedJobs}
            />

            <JobsToolbar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                workMode={workMode}
                setWorkMode={setWorkMode}
            />

            <div className=" items-center justify-between">

                <p className="text-sm text-muted-foreground">

                    Showing

                    <span className="font-semibold text-foreground">
                        {" "}{filteredJobs.length}
                    </span>
                        </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job._id}
                                job={job}
                            />
                        ))}
                    </div>

            </div>
        </div>
    );
}