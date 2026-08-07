"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
    MapPin,
    BriefcaseBusiness,
    IndianRupee,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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


{job && (
    
            <div className="rounded-3xl border bg-white p-8 shadow-sm" key={job._id} job={job}>

                <div className="flex flex-col justify-between gap-6 lg:flex-row">

                    <div>

                        <Badge className="mb-4">
                            {job.status}
                        </Badge>

                        <h1 className="text-4xl font-bold">
                            {job.title}
                        </h1>

                        <p className="mt-2 text-lg text-muted-foreground">
                            {job.companyId.companyName}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-6 text-muted-foreground">

                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                {job.location}
                            </div>

                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness className="h-5 w-5" />
                                {job.employmentType}
                            </div>

                            <div className="flex items-center gap-2">
                                <IndianRupee className="h-5 w-5" />
                                ₹{job.salary}
                            </div>

                        </div>

                    </div>

                   

                </div>

            </div>
)}


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