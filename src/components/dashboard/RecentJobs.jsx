import Link from "next/link";
import { ArrowRight, MapPin, BriefcaseBusiness } from "lucide-react";

export default function RecentJobs({ jobs }) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold">
                        Recent Jobs
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Your latest job postings
                    </p>

                </div>

                <Link
                    href="/recruiter/jobs"
                    className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
                >
                    View All
                    <ArrowRight className="h-4 w-4" />
                </Link>

            </div>

            <div className="space-y-4">

                {jobs.length === 0 ? (

                    <p className="text-center text-muted-foreground py-10">
                        No jobs posted yet.
                    </p>

                ) : (

                    jobs.map((job) => (

                        <div
                            key={job._id}
                            className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-slate-50"
                        >

                            <div>

                                <h3 className="font-semibold">
                                    {job.title}
                                </h3>

                                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">

                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {job.location}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <BriefcaseBusiness className="h-4 w-4" />
                                        {job.employmentType}
                                    </span>

                                </div>

                            </div>

                            <Link
                                href={`/recruiter/jobs/edit/${job._id}`}
                                className="text-sm font-medium text-indigo-600 hover:underline"
                            >
                                Edit
                            </Link>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}