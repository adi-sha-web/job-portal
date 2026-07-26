"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/jobs/public/${id}`);
                const data = await res.json();

                if (data.success) {
                    setJob(data.job);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-10 text-xl">
                Loading...
            </div>
        );
    }

    if (!job) {
        return (
            <div className="text-center mt-10 text-red-600 text-xl">
                Job not found.
            </div>
        );
    }

    const handleApply = async () => {
        try {
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobId: job._id,
                }),
            });

            const data = await res.json();

            alert(data.message);
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-4xl font-bold mb-6">
                {job.title}
            </h1>

            <div className="space-y-5 bg-white shadow rounded-lg p-6 border">

                <div>
                    <h2 className="font-semibold text-lg">Description</h2>
                    <p>{job.description}</p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Location</h2>
                    <p>{job.location}</p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Work Mode</h2>
                    <p>{job.workMode}</p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Employment Type</h2>
                    <p>{job.employmentType}</p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Experience</h2>
                    <p>{job.experience}</p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Salary</h2>
                    <p>₹ {job.salary}</p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Skills Required</h2>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Openings</h2>
                    <p>{job.openings}</p>
                </div>

                <div>
                    <h2 className="font-semibold text-lg">Application Deadline</h2>
                    <p>
                        {new Date(job.deadline).toLocaleDateString()}
                    </p>
                </div>

                <button
                    onClick={() => handleApply()}
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                    Apply Now
                </button>

            </div>
        </div>
    );
}