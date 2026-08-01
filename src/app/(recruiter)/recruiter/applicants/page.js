"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import Link from "next/link";
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

export default function applicants() {
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

    function formatSalary(salary) {
        return `${(salary / 100000).toFixed(1)} LPA`;
    }


    return (
        <div className=" items-center justify-between">

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
                                                        <Link href={`/recruiter/applicants/${job._id}`}>
                                                            Applicants
                                                        </Link>
                                                    </Button>
                                
                                                </div>
                                
                                            </div>
                                
                                        </div>
                
                    ))}
            </div>

            

        </div>
    );
}