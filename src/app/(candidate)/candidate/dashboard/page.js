"use client";

import { useEffect, useState } from "react";

import DashboardStats from "@/components/candidate/DashboardStats";
import RecentApplications from "@/components/candidate/RecentApplications";

export default function CandidateDashboard() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    async function fetchApplications() {

        try {

            const res = await fetch("/api/applications/my");
            const data = await res.json();

            if (data.success) {
                setApplications(data.applications);
            }

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="space-y-8 m-6">

            <div>

                <p className="text-sm text-muted-foreground">
                    Welcome back 👋
                </p>

                <h1 className="text-4xl font-bold">
                    Candidate Dashboard
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Track your job applications and discover new opportunities.
                </p>

            </div>

            <DashboardStats applications={applications} />

            <RecentApplications applications={applications} />

        </div>
    );
}