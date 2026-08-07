"use client";

import { useEffect, useState } from "react";
import ApplicationCard from "@/components/applications/ApplicationCard";

export default function MyApplicationsPage() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await fetch("/api/applications/my");
            const data = await res.json();

            if (data.success) {
                setApplications(data.applications);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    My Applications
                </h1>

                <p className="text-muted-foreground mt-2">
                    Track all the jobs you've applied for.
                </p>

            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-6">

                {applications.length === 0 ? (
                    "You haven't applied for any jobs yet."
                ) : (
                    
                        applications.map((application) => (

                            <ApplicationCard
                                key={application._id}
                                application={application}
                            />

                        ))

                    
                )}

            </div>

        </div>
    );
}