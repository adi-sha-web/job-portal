"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Latest Jobs
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="border rounded-lg p-5 shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-bold">
                            {job.title}
                        </h2>

                        <p className="text-gray-600 mt-2">
                            {job.location}
                        </p>

                        <p className="mt-2">
                            {job.employmentType}
                        </p>

                        <p className="mt-2">
                            ₹ {job.salary}
                        </p>

                        <Link
                            href={`/jobs/${job._id}`}
                            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}