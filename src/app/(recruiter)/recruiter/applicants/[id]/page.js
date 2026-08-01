"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApplicantCard from "@/components/applicants/ApplicantCard";

export default function ApplicantsPage() {
    const { id } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        const res = await fetch(`/api/applications/job/${id}`);
        const data = await res.json();

        if (data.success) {
            setApplications(data.applications);
        }
    };

    const updateStatus = async (applicationId, status) => {
        const res = await fetch(`/api/applications/${applicationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        const data = await res.json();

        alert(data.message);

        if (data.success) {
            fetchApplicants();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Applicants
            </h1>

            <div className="grid gap-6">

    {applications.map((application) => (

        <ApplicantCard

            key={application._id}

            application={application}

            updateStatus={updateStatus}

        />

    ))}

</div>

        </div>
    );
}