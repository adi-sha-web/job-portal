"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import JobCard from "@/components/jobs/JobCard";

import {
    BriefcaseBusiness,
    MapPin,
    Laptop,
    IndianRupee,
    Users,
    Calendar,
    Clock3,
    Pencil,
    Eye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteJobButton from "@/components/jobs/DeleteJobButton";

export default function jobsPage() {

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


    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this job?");

        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                setJobs((prevJobs) =>
                    prevJobs.filter((job) => job._id !== id)
                );
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    function formatSalary(salary) {
        return `${(salary / 100000).toFixed(1)} LPA`;
    }


    return (
        <div className=" mx-auto p-6">

            <h2 className="text-2xl font-bold mb-4">
                Jobs Posted
            </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {jobs.map((job) => (              


                <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md" key={job._id}
                        job={job}>
                
                
                            <div className="flex items-start justify-between">
                
                                <div>
                
                                    <h2 className="text-xl font-semibold">
                                        {job.title}
                                    </h2>
                
                                    <div className="mt-2 flex flex-wrap gap-2">
                
                                        <Badge className="bg-green-100 text-green-700 border-green-200"
                                            variant={
                                                job.status === "Open"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {job.status}
                                        </Badge>
                
                                        <Badge variant="outline">
                                            {job.employmentType}
                                        </Badge>
                
                                    </div>
                
                                </div>
                
                                <Button
                                    asChild
                                    variant="outline"
                                    size="icon"
                                >
                                    <Link href={`/recruiter/jobs/edit/${job._id}`}>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                </Button>
                
                            </div>
                
                            {/* Details */}
                
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {job.location}
                                </div>
                
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Laptop className="h-4 w-4" />
                                    {job.workMode}
                                </div>
                
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <BriefcaseBusiness className="h-4 w-4" />
                                    {job.experience}
                                </div>
                
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <IndianRupee className="h-4 w-4" />
                                    {formatSalary(job.salary)}
                                </div>
                
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    {job.openings} Openings
                                </div>
                
                                {job.deadline && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        Apply before{" "}
                                        {new Date(job.deadline).toLocaleDateString()}
                                    </div>
                                )}
                
                            </div>
                
                            {/* Skills */}
                
                            {job.skills.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                
                                    {job.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                
                                </div>
                            )}
                
                            {/* Footer */}
                
                            <div className="mt-6 flex items-center justify-between border-t pt-5">
                
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                
                                    <Clock3 className="h-4 w-4" />
                
                                    Posted{" "}
                                    {new Date(job.createdAt).toLocaleDateString()}
                
                                </div>
                
                                <div className="flex gap-3">
                
                                    <Button
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href={`/jobs/${job._id}`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Preview
                                        </Link>
                                    </Button>
                
                                    <Button asChild>
                                        <Link href={`/jobs/${job._id}`}>
                                            Apply
                                        </Link>
                                    </Button>
                
                                    <DeleteJobButton
                                        jobId={job._id}
                                        title={job.title}
                                    />
                
                                </div>
                
                            </div>
                
                        </div>

    ))}
                </div>


            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Location</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Salary</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.map((job) => (
                        <tr key={job._id}>
                            <td className="border p-2">{job.title}</td>
                            <td className="border p-2">{job.location}</td>
                            <td className="border p-2">{job.employmentType}</td>
                            <td className="border p-2">₹{job.salary}</td>
                            <td className="border p-2">{job.status}</td>

                            <td className="border p-2">
                                <Link
                                    href={`/recruiter/jobs/edit/${job._id}`}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    type="button"
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                    onClick={() => handleDelete(job._id)}
                                >
                                    Delete
                                </button>

                                <Link
                                    href={`/recruiter/applicants/${job._id}`}
                                    className="bg-indigo-600 text-white px-3 py-1 rounded mr-2"
                                >
                                    View Applicants
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}