import {
    MapPin,
    BriefcaseBusiness,
    IndianRupee,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function JobHero({ job }) {


     const apply = async (job) => {
        const res = await fetch(`/api/applications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ jobId: job._id }),

        }
        );
  
        const data = await res.json();

        alert(data.message);

        if (data.success) {
            alert("applyed successfully")
        }
    };

    return (

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

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

                <div>

                    <Button
                        size="lg"
                        onClick={() => apply(job)}
                    >
                        Apply Now
                    </Button>

                </div>

            </div>

        </div>

    );

}