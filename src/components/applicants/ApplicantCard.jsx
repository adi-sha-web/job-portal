import { Mail, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

export default function ApplicantCard({

    application,

    updateStatus,

}) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-semibold">

                        {application.candidateId.name}

                    </h2>

                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">

                        <div className="flex items-center gap-2">

                            <Mail className="h-4 w-4" />

                            {application.candidateId.email}

                        </div>

                        <div className="flex items-center gap-2">

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

            <div className="mt-6 flex gap-3">

                <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() =>
                        updateStatus(
                            application._id,
                            "Accepted"
                        )
                    }
                >
                    Accept
                </Button>

                <Button
                    variant="destructive"
                    onClick={() =>
                        updateStatus(
                            application._id,
                            "Rejected"
                        )
                    }
                >
                    Reject
                </Button>

            </div>
            

        </div>

    );

}