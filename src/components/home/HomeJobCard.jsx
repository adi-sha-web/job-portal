import Link from "next/link";

import {
    MapPin,
    IndianRupee,
    BriefcaseBusiness,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HomeJobCard({ job }) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <Badge>

                {job.workMode}

            </Badge>

            <h3 className="mt-4 text-2xl font-bold">

                {job.title}

            </h3>

            <p className="mt-2 text-muted-foreground">

                {job.companyId.companyName}

            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">

                <div className="flex items-center gap-2">

                    <MapPin className="h-4 w-4" />

                    {job.location}

                </div>

                <div className="flex items-center gap-2">

                    <BriefcaseBusiness className="h-4 w-4" />

                    {job.employmentType}

                </div>

                <div className="flex items-center gap-2">

                    <IndianRupee className="h-4 w-4" />

                    ₹{job.salary}

                </div>

            </div>

            <Button
                asChild
                className="mt-8 w-full"
            >

                <Link href={`/jobs/${job._id}`}>

                    View Details

                </Link>

            </Button>

        </div>

    );

}