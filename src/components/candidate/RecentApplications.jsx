import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RecentApplications({ applications }) {

    const recentApplications = applications.slice(0, 5);

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold">
                        Recent Applications
                    </h2>

                    <p className="text-muted-foreground">
                        Your latest job applications.
                    </p>

                </div>

                {recentApplications.length === 0 ? (
                    ""
                ) : (
                    <Button
                        asChild
                        variant="ghost"
                    >
                        <Link href="/candidate/applications">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                )}

            </div>

            <div className="mt-6 space-y-4">

                {recentApplications.length === 0 ? (

                    <div className="rounded-xl border border-dashed p-10 text-center">

                        <p className="text-muted-foreground">
                            You haven't applied for any jobs yet.
                        </p>

                        <Button
                            asChild
                            className="mt-4"
                        >
                            <Link href="/jobs">
                                Browse Jobs
                            </Link>
                        </Button>

                    </div>

                ) : (

                    recentApplications.map((application) => (

                        <div
                            key={application._id}
                            className="flex items-center justify-between rounded-xl border p-4"
                        >

                            <div>

                                <h3 className="font-semibold">
                                    {application.jobId.title}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    {application.jobId.companyId.companyName}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">

                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {application.jobId.location}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="h-4 w-4" />
                                        {new Date(
                                            application.createdAt
                                        ).toLocaleDateString()}
                                    </div>

                                </div>

                            </div>

                            <Badge>

                                {application.status}

                            </Badge>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}