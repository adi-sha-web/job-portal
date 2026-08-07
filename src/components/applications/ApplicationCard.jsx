import {
    MapPin,
    CalendarDays,
    BriefcaseBusiness,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ApplicationCard({ application }) {

    const badgeColor = {
        Pending:
            "bg-yellow-100 text-yellow-700",

        Accepted:
            "bg-green-100 text-green-700",

        Rejected:
            "bg-red-100 text-red-700",
    };

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-semibold">

                        {application.jobId.title}

                    </h2>

                    <p className="text-muted-foreground">

                        {application.jobId.companyId.companyName}

                    </p>

                </div>

                <Badge
                    className={badgeColor[application.status]}
                >
                    {application.status}
                </Badge>

            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">

                <div className="flex items-center gap-2 text-sm text-muted-foreground">

                    <MapPin className="h-4 w-4" />

                    {application.jobId.location}

                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">

                    <BriefcaseBusiness className="h-4 w-4" />

                    {application.jobId.employmentType}

                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">

                    <CalendarDays className="h-4 w-4" />

                    Applied on{" "}
                    {new Date(
                        application.createdAt
                    ).toLocaleDateString()}

                </div>


            </div>
                <Button asChild variant="outline">
                    <Link href={`/candidate/jobs/${application.jobId._id}`}>
                        View Job
                    </Link>
                </Button>

        </div>

    );

}