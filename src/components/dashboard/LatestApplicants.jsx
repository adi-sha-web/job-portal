import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LatestApplicants({ applications }) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-bold">
                        Latest Applicants
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Recently received applications
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

            {applications.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                    No applications yet.
                </div>
            ) : (
                <div className="space-y-4">

                    {applications.map((application) => (

                        <div
                            key={application._id}
                            className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50 transition"
                        >

                            <div>

                                <h3 className="font-semibold">
                                    {application.candidateId.name}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    {application.jobId.title}
                                </p>

                            </div>

                            <Badge
                                variant={
                                    application.status === "Accepted"
                                        ? "default"
                                        : application.status === "Rejected"
                                        ? "destructive"
                                        : "secondary"
                                }
                            >
                                {application.status}
                            </Badge>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}